const pool = require('../../database/connection');

module.exports = {
    getBooks: (req, res, next) => {
        if(req.headers.token) {
          var offset = req.query.offset;
          var query = "SELECT * FROM `books` WHERE `status` = 1 ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
          var totalBooks = "SELECT COUNT(*) AS totalBooks FROM `books` WHERE `status` = 1";
          pool.query(query,function(err,query){
            pool.query(totalBooks,function(err,totalBooks){
              if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      books: [],
                      totalBooks:0,
                  });
              } else {
                res.json({
                  message:'success',
                  books:query,
                  totalBooks: totalBooks.length != 0 ? totalBooks[0].totalBooks : 0,
                });
              }
            });
          });
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
    },
    getPurchasedBooks: (req, res, next) => {
        if(req.headers.token) {
          var subscription = "SELECT c.*,(SELECT DATEDIFF(end_date,CURRENT_TIMESTAMP) FROM `subscription` INNER JOIN `users` ON `users`.`id` = `subscription`.`user_id` WHERE `users`.`id` = '"+ req.query.user_id +"' AND `subscription`.`item_id` = c.`id` AND `subscription`.`item_category` = 'book' AND `subscription`.`status` = 1 ORDER BY `subscription`.`id` DESC LIMIT 1 OFFSET 0) AS subscribeddays FROM `books` c WHERE `status` = 1 ORDER BY `created_at` DESC;";
          pool.query(subscription,function(err,subscription){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    books: [],
                    totalBooks:0,
                });
            } else {
              res.json({
                message:'success',
                books:subscription,
                totalBooks: 0,
              });
            }
          });
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
    },
    getSearchedBooks : (req, res, next) => {
        if(req.headers.token) {
          var title = req.query.title;
          var query = "SELECT * FROM `books` WHERE `status` = 1 AND `title` LIKE '%"+ title +"%' ORDER BY `id` DESC";
          pool.query(query,function(err,query){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    books: [],
                });
            } else {
              res.json({
                message:'success',
                books:query,
              });
            }
          }); 
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
      },
      getEachBook: (req,res,next) => {
          if(req.headers.token) {
              var query = "SELECT * FROM `books` WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
              var images = "SELECT * FROM `images` WHERE `iv_category` = 'image' AND `item_category` = 'books' AND `item_id` = '"+ req.query.id +"'";
              pool.query(images,function(err,images){
                pool.query(query,function(err,query){
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            data: [],
                            images: [],
                        });
                    } else {
                      res.json({
                        message:'success',
                        data:query,
                        images: images,
                      });
                    }
                  });
              });
            } else {
              res.json({
                message : 'Auth_token_failure',
              });
            }
      },
      increaseBookDownload: (req,res,next) => {
        if(req.headers.token) {
            var query = "UPDATE `books` SET `downloads` = `downloads` + 1 WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
            pool.query(query,function(err,query){
                if(err) {
                  console.log(err);
                    res.json({
                        message:'Database_connection_error',
                    });
                } else {
                  res.json({
                    message:'success',
                  });
                }
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    checkBookSubscription: (req,res,next) => {
        if(req.headers.token) {
            var subscription = "SELECT DATEDIFF(end_date,CURRENT_TIMESTAMP) AS subscribeddays,`subscription`.`status`,`subscription`.`id` AS subscription_id FROM `subscription` INNER JOIN `users` ON `users`.`id` = `subscription`.`user_id` WHERE `users`.`id` = '"+ req.query.user_id +"' AND `subscription`.`item_id` = '"+ req.query.id +"' AND `subscription`.`item_category` = 'book' ORDER BY `subscription`.`id` DESC LIMIT 1 OFFSET 0";
            pool.query(subscription,function(err,subscription){
                if(err) {
                  console.log(err);
                    res.json({
                        message:'Database_connection_error',
                    });
                } else {
                    if(subscription.length != 0){
                        if(subscription[0].subscribeddays <= 0) {
                            if(subscription[0].status == 1) {
                                var updateStatus = "UPDATE `subscription` SET `status` = 0 WHERE `id` = '"+ subscription[0].subscription_id +"'";
                                pool.query(updateStatus,function(err,updateStatus){
                                    res.json({
                                        message:'cannot_download_subscription_expired',
                                        canDownload: false
                                    });
                                });
                            } else {
                                res.json({
                                    message:'cannot_download_subscription_expired',
                                    canDownload: false
                                });
                            }
                        } else {
                            if(subscription[0].status == 1) {
                                res.json({
                                    message:'can_download',
                                    canDownload: true
                                });
                            } else {
                                var updateStatus = "UPDATE `subscription` SET `status` = 1 WHERE `id` = '"+ subscription[0].subscription_id +"'";
                                pool.query(updateStatus,function(err,updateStatus){
                                    res.json({
                                        message:'can_download',
                                        canDownload: true
                                    });
                                });
                            }
                        }
                    } else {
                        res.json({
                          message:'not_purchased_yet',
                          canDownload: false
                        });
                    }
                }
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
}