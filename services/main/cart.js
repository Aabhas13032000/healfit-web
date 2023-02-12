const pool = require('../../database/connection');

module.exports = {
    //Get user details
    getUserCart: (req,res,next) => {
        if(req.headers.token) {
            var user_id = req.query.user_id;
            var query = "SELECT c.`id` AS cartId,tp.*,p.`title`,p.`cover_photo`, t.`name` AS trainerName FROM `cart` c INNER JOIN `trainer_programs` tp ON tp.`id` = c.`trainer_program_id` INNER JOIN `programs` p ON p.`id` = c.`item_id` JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE c.`user_id` = '"+ user_id +"' AND c.`item_category` = 'program' ORDER BY c.`created_at` DESC";
            pool.query(query,function(err,query){
                if(err) {
                  console.log(err);
                    res.json({
                        message:'Database_connection_error',
                        data: [],
                    });
                } else {
                  res.json({
                    message:'success',
                    data:query,
                  });
                }
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    getUserProductCart: (req,res,next) => {
        if(req.headers.token) {
            var user_id = req.query.user_id;
            var query = "SELECT c.`id` AS cartId,c.`item_id`,c.`item_category`,c.`quantity`,c.`description`,p.`name`,p.`cover_photo`,p.`discount_price`,pq.`quantity` AS maximum_quantity FROM `cart` c INNER JOIN `products` p ON p.`id` = c.`item_id` INNER JOIN `product_size_quantity` pq ON pq.`item_id` = c.`item_id` WHERE c.`user_id` = '"+ user_id +"' AND c.`item_category` = 'product' AND pq.`size` = c.`description` ORDER BY c.`created_at` DESC";
            var shippingDetails = "SELECT `maximum_value` , `shipping_charges` FROM `admin`";
            var address = "SELECT a.* , (SELECT u.`default_address` FROM `users` u WHERE u.`id` = a.`user_id` AND u.`default_address` = a.`id` ) AS default_address FROM `address` a WHERE `user_id` = '"+ user_id +"'";
            pool.query(query,function(err,query){
              pool.query(shippingDetails,function(err,shippingDetails){
                pool.query(address,function(err,address){
                  if(err) {
                    console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          data: [],
                          shippingDetails:[],
                          address:[],
                      });
                  } else {
                    res.json({
                      message:'success',
                      data:query,
                      shippingDetails:shippingDetails,
                      address:address,
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
    getCheckoutProduct: (req,res,next) => {
        if(req.headers.token) {
            var user_id = req.query.user_id;
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
            var eachQuantity = "SELECT * FROM `product_size_quantity` WHERE `size` = '"+ req.query.size +"' AND `item_id` = '"+ req.query.id +"'";
            var shippingDetails = "SELECT `maximum_value` , `shipping_charges` FROM `admin`";
            var address = "SELECT a.* , (SELECT u.`default_address` FROM `users` u WHERE u.`id` = a.`user_id` AND u.`default_address` = a.`id` ) AS default_address FROM `address` a WHERE `user_id` = '"+ user_id +"'";
            pool.query(query,function(err,query){
              pool.query(shippingDetails,function(err,shippingDetails){
                pool.query(address,function(err,address){
                  pool.query(eachQuantity,function(err,eachQuantity){
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            data: [],
                            shippingDetails:[],
                            address:[],
                            eachQuantity:[],
                        });
                    } else {
                      res.json({
                        message:'success',
                        data:query,
                        shippingDetails:shippingDetails,
                        address:address,
                        eachQuantity:eachQuantity,
                      });
                    }
                  });
                });
              });
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    getUserMobileCart: (req,res,next) => {
        if(req.headers.token) {
            var user_id = req.query.user_id;
            var products = "SELECT c.`id` AS cartId,c.`item_id`,c.`created_at`,c.`item_category`,c.`quantity`,c.`description`,p.`name`,p.`cover_photo`,p.`discount_price` FROM `cart` c INNER JOIN `products` p ON p.`id` = c.`item_id` WHERE c.`user_id` = '"+ user_id +"' AND c.`item_category` = 'product' ORDER BY c.`created_at` DESC";
            var programs = "SELECT c.`id` AS cartId,c.`created_at`,c.`item_category`,tp.*,p.`title`,p.`cover_photo`, t.`name` AS trainerName FROM `cart` c INNER JOIN `trainer_programs` tp ON tp.`id` = c.`trainer_program_id` INNER JOIN `programs` p ON p.`id` = c.`item_id` JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE c.`user_id` = '"+ user_id +"' AND c.`item_category` = 'program' ORDER BY c.`created_at` DESC";
            var shippingDetails = "SELECT `maximum_value` , `shipping_charges` FROM `admin`";
            var address = "SELECT a.* , (SELECT u.`default_address` FROM `users` u WHERE u.`id` = a.`user_id` AND u.`default_address` = a.`id` ) AS default_address FROM `address` a WHERE `user_id` = '"+ user_id +"'";
            pool.query(programs,function(err,programs){
              pool.query(products,function(err,products){
                pool.query(shippingDetails,function(err,shippingDetails){
                  pool.query(address,function(err,address){
                    var array = programs.concat(products);
                    array.sort((a, b) => {
                      let da = new Date(a.created_at),
                          db = new Date(b.created_at);
                      return db - da;
                    });
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            data: [],
                            shippingDetails:[],
                            address:[],
                        });
                    } else {
                      res.json({
                        message:'success',
                        data:array,
                        shippingDetails:shippingDetails,
                        address:address,
                      });
                    }
                  });
                });
              });
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    addToCart: (req,res,next) => {
        if(req.headers.token) {
          var checkCart = "SELECT * FROM `cart` WHERE `item_category` = '"+ req.body.item_category +"' AND `item_id` = '"+ req.body.item_id +"' AND `user_id` = '"+ req.body.user_id +"' AND `cart_category` = 'cart' AND `trainer_program_id` = '"+ req.body.trainer_program_id +"'";
          pool.query(checkCart,function(err,checkCart,){
            if(err) {
              console.log(err);
                res.json({message:'Database_connection_error'});
            } else {
                if(checkCart.length != 0){
                  res.json({message: 'already_added'});
                } else {
                  var query  = "INSERT INTO `cart` (`item_category`,`item_id`,`user_id`,`cart_category`,`trainer_program_id`) VALUES ('"+ req.body.item_category +"','"+ req.body.item_id +"','"+ req.body.user_id +"','cart','"+ req.body.trainer_program_id +"')";
                  pool.query(query,function(err,results,fields){
                      if(err) {
                        console.log(err);
                          res.json({message:'Database_connection_error'});
                      } else {
                          res.json({message: 'success'});
                      }
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
    addProductToCart: (req,res,next) => {
        if(req.headers.token) {
          var query  = "INSERT INTO `cart` (`item_category`,`item_id`,`user_id`,`cart_category`,`quantity`,`description`,`trainer_program_id`) VALUES ('"+ req.body.item_category +"','"+ req.body.item_id +"','"+ req.body.user_id +"','cart',1,'"+ req.body.description +"',0)";
          pool.query(query,function(err,results,fields){
            if(err) {
              console.log(err);
              res.json({message:'Database_connection_error'});
            } else {
              res.json({message: 'success'});
            }
          });
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
    },
    increaseDecreaseQuantity: (req,res,next) => {
        if(req.headers.token) {
          if(req.body.value == 'add'){
            var query  = "UPDATE `cart` SET `quantity` = `quantity` + 1 WHERE `id` = '"+ req.body.id +"'";
          } else {
            var query  = "UPDATE `cart` SET `quantity` = `quantity` - 1 WHERE `id` = '"+ req.body.id +"'";
          }
          pool.query(query,function(err,results,fields){
            if(err) {
              console.log(err);
              res.json({message:'Database_connection_error'});
            } else {
              res.json({message: 'success'});
            }
          });
        } else {
          res.json({
            message : 'Auth_token_failure',
          });
        }
    },
    removeFromCart : (req,res,next) => {
        if(req.headers.token) {
            var query  = "DELETE FROM `cart` WHERE `id` = '"+ req.body.cart_id +"'";
            console.log(query);
            pool.query(query,function(err,results,fields){
                if(err) {
                  console.log(err);
                    res.json({message:'Database_connection_error'});
                } else {
                    res.json({message: 'success'});
                }
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
}