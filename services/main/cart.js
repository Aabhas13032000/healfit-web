const pool = require('../../database/connection');

module.exports = {
    //Get user details
    getUserCart: (req,res,next) => {
        if(req.headers.token) {
            var user_id = req.query.user_id;
            var query = "SELECT c.`id` AS cartId,tp.*,p.`title`,p.`cover_photo`, t.`name` AS trainerName FROM `cart` c INNER JOIN `trainer_programs` tp ON tp.`id` = c.`trainer_program_id` INNER JOIN `programs` p ON p.`id` = c.`item_id` JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE c.`user_id` = '"+ user_id +"' ORDER BY c.`created_at` DESC";
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