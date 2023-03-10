const pool = require('../../database/connection');

module.exports = {
    getBlogs: (req, res, next) => {
        if(req.headers.token) {
          var offset = req.query.offset;
          var imp = req.query.imp ? req.query.imp : 0 ;
          // var query = "SELECT * FROM `blog` WHERE `status` = 1 AND `imp` = '"+ imp +"' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
          var totalBlogs = "SELECT COUNT(*) AS totalblogs FROM `blog` WHERE `status` = 1 AND `imp` = '"+ imp +"'";
          // var query = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`imp` = '"+ imp +"' ORDER BY b.`id` DESC LIMIT 20 OFFSET "+ offset +"";
          var query = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 ORDER BY b.`id` DESC LIMIT 20 OFFSET "+ offset +"";
          if(offset == 0 && imp == 0) {
            var popular = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`imp` = 1 ORDER BY b.`id` DESC";
            pool.query(query,function(err,query){
              pool.query(popular,function(err,popular){
                pool.query(totalBlogs,function(err,totalBlogs){
                  if(err) {
                    console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          blogs: [],
                          popularBlogs: [],
                          totalBlogs:0,
                      });
                  } else {
                    res.json({
                      message:'success',
                      blogs:query,
                      popularBlogs: popular,
                      totalBlogs: totalBlogs.length != 0 ? totalBlogs[0].totalblogs : 0,
                    });
                  }
                });
              });
            });
          } else {
            pool.query(query,function(err,query){
              if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      blogs: [],
                      popularBlogs: [],
                      totalBlogs:0,
                  });
              } else {
                res.json({
                  message:'success',
                  blogs:query,
                  popularBlogs: [],
                  totalBlogs:0,
                });
              }
            });
          }
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
    },
    getSearchedBlogs : (req, res, next) => {
        if(req.headers.token) {
          var title = req.query.title;
          var query = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`title` LIKE '%"+ title +"%' ORDER BY b.`id` DESC";
          pool.query(query,function(err,query){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    blogs: [],
                    popularBlogs: [],
                });
            } else {
              res.json({
                message:'success',
                blogs:query,
                popularBlogs: [],
              });
            }
          }); 
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
      },
      getEachBlog: (req,res,next) => {
          if(req.headers.token) {
              var query = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`id` = '"+ req.query.id +"'";
              var images = "SELECT * FROM `images` WHERE `iv_category` = 'image' AND `item_category` = 'blogs' AND `item_id` = '"+ req.query.id +"'";
              var moreBlogs = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`id` <> '"+ req.query.id +"' ORDER BY RAND() DESC LIMIT 3 OFFSET 0";
              // var increaseViewCount = "UPDATE `blog` SET `views` = `views` + 1 WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
              // pool.query(increaseViewCount,function(err,increaseViewCount){
                  
              // });
              pool.query(images,function(err,images){
                pool.query(moreBlogs,function(err,moreBlogs){
                  pool.query(query,function(err,query){
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            data: [],
                            images: [],
                            moreBlogs: []
                        });
                    } else {
                      res.json({
                        message:'success',
                        data:query,
                        images: images,
                        moreBlogs: moreBlogs
                      });
                    }
                  });
                });
              });
            } else {
              res.json({
                message : 'Auth_token_failure',
              });
            }
      },
      getEachBlogComments: (req,res,next) => {
        if(req.headers.token) {
          var offset = req.query.offset;
            var query = "SELECT lk.*, u.`name`, u.`profile_image` FROM `like_comment` lk INNER JOIN `users` u ON u.`id` = lk.`user_id` WHERE lk.item_id = '"+ req.query.item_id +"' AND lk.item_category = 'blog' AND lk.`category` = 'COMMENT' ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            var totalComments = "SELECT COUNT(*) AS total FROM `like_comment` WHERE item_id = '"+ req.query.item_id +"' AND item_category = 'blog' AND `category` = 'COMMENT'";
            pool.query(query,function(err,query){
              pool.query(totalComments,function(err,totalComments){
                if(err) {
                  console.log(err);
                    res.json({
                        message:'Database_connection_error',
                        comments: [],
                        totalComments:0
                    });
                } else {
                  res.json({
                    message:'success',
                    comments: query,
                    totalComments:totalComments.length != 0 ? totalComments[0].total : total,
                  });
                }
              });
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
              comments: [],
              totalComments:0
            });
          }
    },
      likeEachBlog: (req,res,next) => {
        if(req.headers.token) {
            var query = "INSERT INTO `like_comment` (`user_id`,`item_id`,`item_category`,`category`) VALUES ('"+ req.body.user_id +"','"+ req.body.id +"', 'blog',1)";
            console.log(query);
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
    commentEachBlog: (req,res,next) => {
      if(req.headers.token) {
          var query = "INSERT INTO `like_comment` (`user_id`,`item_id`,`item_category`,`category`,`message`) VALUES ('"+ req.body.user_id +"','"+ req.body.id +"', 'blog',2,'"+ req.body.message +"')";
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
    deleteLikeComment: (req,res,next) => {
      if(req.headers.token) {
          var query = "DELETE FROM `like_comment` WHERE `item_id` = '"+ req.body.id +"' AND `item_category` = 'blog' AND `category` = 'LIKE' AND `user_id` = '"+ req.body.user_id +"'";
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
}