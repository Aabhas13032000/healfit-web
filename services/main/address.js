const { query } = require('express');
const pool = require('../../database/connection');

module.exports = {
    addAddress: (req,res,next) => {
        if(req.headers.token) {
          var area = req.body.area.replace(/'/g, '-').replace(/"/g, '');
          var landmark = req.body.landmark.replace(/'/g, '-').replace(/"/g, '');
          var flat_no = req.body.flat_no.replace(/'/g, '-').replace(/"/g, '');
          var checkCart = "INSERT INTO `address` (`user_id`,`full_name`,`phoneNumber`,`flat_no`,`area`,`landmark`,`pincode`,`city`,`state`,`category`) VALUES ('"+ req.body.user_id +"','"+ req.body.full_name +"','"+ req.body.phoneNumber +"','"+ flat_no +"','"+ area +"','"+ landmark +"','"+ req.body.pincode +"','"+ req.body.city +"','"+ req.body.state +"','"+ req.body.category +"')";
          console.log(checkCart);
          pool.query(checkCart,function(err,checkCart){
            if(err) {
              console.log(err);
                res.json({message:'Database_connection_error'});
            } else {
                if(req.body.default_address == 1) {
                  var update = "UPDATE `users` SET `default_address` = '"+ checkCart.insertId +"' WHERE `id` = '"+ req.body.user_id +"'";
                  pool.query(update,function(err,update){
                    if(err) {
                      console.log(err);
                        res.json({message:'Database_connection_error'});
                    } else {
                        res.json({message: 'success'});
                    }
                  });
                } else {
                  res.json({message: 'success'});
                }
            }
        });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    saveAddress: (req,res,next) => {
        if(req.headers.token) {
          var area = req.body.area.replace(/'/g, '-').replace(/"/g, '');
          var landmark = req.body.landmark.replace(/'/g, '-').replace(/"/g, '');
          var flat_no = req.body.flat_no.replace(/'/g, '-').replace(/"/g, '');
          var checkCart = "UPDATE `address` SET `full_name` = '"+ req.body.full_name +"',`phoneNumber` = '"+ req.body.phoneNumber +"',`flat_no` = '"+ flat_no +"',`area` = '"+ area +"',`landmark` = '"+ landmark +"',`pincode` = '"+ req.body.pincode +"',`city` = '"+ req.body.city +"',`state` = '"+ req.body.state +"',`category` = '"+ req.body.category +"' WHERE id = '"+ req.body.id +"'";
          pool.query(checkCart,function(err,checkCart){
            if(err) {
              console.log(err);
                res.json({message:'Database_connection_error'});
            } else {
              if(req.body.default_address == 1) {
                var update = "UPDATE `users` SET `default_address` = '"+ req.body.id +"' WHERE `id` = '"+ req.body.user_id +"'";
                pool.query(update,function(err,update){
                  if(err) {
                    console.log(err);
                      res.json({message:'Database_connection_error'});
                  } else {
                      res.json({message: 'success'});
                  }
                });
              } else {
                res.json({message: 'success'});
              }
            }
          });
        } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    deleteAddress : (req,res,next) => {
        if(req.headers.token) {
            var query  = "DELETE FROM `address` WHERE `id` = '"+ req.body.id +"'";
            // console.log(query);
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