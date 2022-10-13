const express = require('express');
const router = express.Router();

//Constants
const constants = require('../../controllers/constants');

//Razorpay
const Razorpay = require('razorpay');

//Database
const pool = require('../../database/connection');

//Mail user
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : "gmail",
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: 'fitmangurugram@gmail.com',
      pass: 'tphcsykeqlqkzydz',
    },
});

router.get('/',function(req,res,next){
    res.json({message:'hello'});
});

//Subscription
var instance = new Razorpay({
  key_id: constants.razorpay_key_id, //TODO: change to production
  key_secret: constants.razorpay_key_secret
})

async function sendMail(user_id,array) {
  // console.log(array);
  var query = "SELECT `email` FROM `users` WHERE `id` = '" + user_id + "'";
  pool.query(query,function(err,user,fields){
    if(err) {
      console.log(err);
      return false;
    } else {
      // console.log(user);
      if(user.length != 0) {
        if(user[0].email != null && user[0].email.length != 0){
          var total = 0;
          var string = '<body style="width: 100%;height: 100%;background-color: #ffffff;font-family: Arial, Helvetica, sans-serif;"> <div style="text-align:center"> <br><div style="text-align: center;width: 100%;"> <img src="http://healfit.in/images/local/logo.png" alt="" style="width: 100px;"> </div><br><h1 style="text-align: center;font-weight: 200;">Thank you for purchasing !!</h1> <br><br><table style=" background-color: white; border-radius: 10px; border: 1px solid #E1F0F4; overflow: hidden; margin: auto;"> <thead style="font-size: 14px;"> <tr> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">#</th> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">ITEM</th> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">QUANTITY</th> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">AMOUNT</th> </tr></thead> <tbody>';
          var string2 = '';
          for(var i=0;i<array.length;i++){
            total = total + array[i].price;
            string2 = string2 + '<tr style="text-align: center;"> <td style="padding: 15px 8px; overflow: hidden;">'+ (i+1) +'</td><td style="padding: 15px 8px; overflow: hidden;">'+ array[i].name +'</td><td style="padding: 15px 8px; overflow: hidden;">'+ array[i].quantity +'</td><td style="padding: 15px 8px; overflow: hidden;">Rs '+ array[i].price +'</td></tr>';
          }
          var string3 = '</tbody> </table> <h3 style="text-align: center;padding: 15px 8px;">Total: Rs '+ total +'</h3> <p style="text-align: center;">To view more programs please visit our webiste</p><br><a href="http://healfit.in/" style="background-color: #FFCE30;color: #080909;padding: 10px 30px;border-radius: 10px;text-decoration: none;" target="_blank">Click here</a> <br><br><p style="text-align: center;">Or download our application</p><br><a href="https://play.google.com/store/apps/details?id=com.healfit.heal_fit" style="border: 0 !important;" target="_blank"><img src="http://healfit.in//images/local/play_store.png" style="border-radius: 8px;" alt=""></a>&nbsp; <a href="https://apps.apple.com/in/app/healfit/id1645721639" style="border: 0 !important;"><img src="http://healfit.in//images/local/app_store.png" style="border-radius: 8px;" alt="" target="_blank"></a> </div></body>';
          var htmlString = string + string2 + string3;
          // console.log(htmlString);
          const mailData = {
            from: 'fitmangurugram@gmail.com',  // sender address
            to: user[0].email,   // list of receivers
            subject: 'HealFit purchased order details reciept',
            text: 'That was easy!',
            html: htmlString,
          };
        
          transporter.sendMail(mailData, function (err, info) {
              if(err){
                  console.log(err);
                  return false;
              }
              else {
                return true;
              }
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  });
}

//Send Mail
// router.post('/sendMail', function (req,res,next){
//   sendMail(req.body.user_id).then((result) => {
//     console.log(result);
//     res.json({
//       message:'success',
//       result:result,
//     });
//   }).catch((err) => {
//     res.json({
//       message : 'Auth_token_failure',
//     });
//   });
// });

//Subascription
router.post('/paymentInitiate',function (req,res,next){
  if(req.headers.token) {
    var options = {
        amount: parseFloat(req.body.total)*100,  // amount in the smallest currency unit
        currency: "INR",
    };
    instance.orders.create(options, function(err, order) {
        var options = {
          "key": constants.razorpay_key_id,
          "amount": parseFloat(req.body.total)*100,
          "currency": "INR",
          "name": req.body.companyName,
          "description": req.body.description,
          "image": constants.isDevelopment ? constants.devLogoImageUrl : constants.prodLogoImageUrl,
          "order_id": order.id,
          "prefill": {
              "name": req.body.name,
              "contact": req.body.phone
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#ffce30"
          },
        };
        res.json(options);
    });
  } else {
    res.json({
      message : 'Auth_token_failure',
    });
  }
});

router.post('/payment-success/:user_id',function (req,res,next){
  instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == "captured") {
      res.json({
        message:'success',
      });
    } else {
      res.json({
        message:'failed',
      });
    }
  });
});

router.post('/purchasedItem',function (req,res,next){
  var item_id = req.query.item_id;
  var item_category = req.query.item_category;
  var user_id = req.query.user_id;
  var page = req.query.page;
  var array = [];
  instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == "captured") {
      var itemData = "SELECT `title`,`discount_price` AS price FROM `books` WHERE `id` = '"+item_id+"'";
      var increaseBookDownload = "UPDATE `books` SET `downloads` = `downloads` + 1 WHERE `status` = 1 AND `id` = '"+ item_id +"'";
      var end_date = new Date(new Date().getTime() + parseInt(365) * 24 * 60 * 60 * 1000);
      var query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`) VALUES ('"+ item_id +"','"+ item_category +"','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"')";
      pool.query(itemData,function(err,itemData,fields){
        pool.query(increaseBookDownload,function(err,increaseBookDownload,fields){
          pool.query(query,function(err,results,fields){
              if(err) {
                console.log(err);
                  res.redirect(`/purchasedBooks?message=payment_failed`);
              } else {
                array.push({
                  name:itemData[0].title,
                  quantity:1,
                  price:itemData[0].price
                })
                sendMail(req.query.user_id,array).then((result) => {
                  res.redirect(`/purchasedBooks?message=payment_successfull`);
                }).catch((err) => {
                  res.redirect(`/purchasedBooks?message=payment_successfull`);
                });
              }
          });
        });
      });
    } else {
      res.redirect(`/purchasedBooks?message=payment_failed`);
    }
  });
});

router.post('/purchasedItemMobile',function (req,res,next){
  var item_id = req.query.item_id;
  var item_category = req.query.item_category;
  var user_id = req.query.user_id;
  var array = [];
  var itemData = "SELECT `title`,`discount_price` AS price FROM `books` WHERE `id` = '"+item_id+"'";
  var increaseBookDownload = "UPDATE `books` SET `downloads` = `downloads` + 1 WHERE `status` = 1 AND `id` = '"+ item_id +"'";
  var end_date = new Date(new Date().getTime() + parseInt(365) * 24 * 60 * 60 * 1000);
      var query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`) VALUES ('"+ (item_id == '0' || item_id == 0 ? 1 : item_id) +"','"+ item_category +"','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"')";
      pool.query(itemData,function(err,itemData,fields){
        pool.query(increaseBookDownload,function(err,increaseBookDownload,fields){
          pool.query(query,function(err,results,fields){
              if(err) {
                console.log(err);
                  res.json({
                    message:'payment_failed',
                  });
              } else {
                array.push({
                  name:itemData[0].title,
                  quantity:1,
                  price:itemData[0].price
                })
                sendMail(req.query.user_id,array).then((result) => {
                  res.json({
                    message:'payment_success',
                  });
                }).catch((err) => {
                  res.json({
                    message:'payment_success',
                  });
                });
              }
          });
        });
    });
});

router.post('/purchaseSingleItem',function (req,res,next){
  var item_id = req.query.item_id;
  var item_category = 'program';
  var user_id = req.query.user_id;
  var trainer_program_id = req.query.trainer_program_id;
  var array = [];
  instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == "captured") {
      var itemData = "SELECT p.`title`,tp.`price` FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`id` = '"+item_id+"' AND tp.`id` = '"+ trainer_program_id +"'";
      var checkCart = "SELECT * FROM `cart` WHERE `item_category` = '"+ item_category +"' AND `item_id` = '"+ item_id +"' AND `user_id` = '"+ user_id +"' AND `cart_category` = 'cart' AND `trainer_program_id` = '"+ trainer_program_id +"'";
      pool.query(itemData,function(err,itemData){
          pool.query(checkCart,function(err,checkCart){
            if(err) {
              console.log(err);
                res.json({message:'Database_connection_error'});
            } else {
                if(checkCart.length != 0){
                  var deleteFromCart = "DELETE FROM `cart` WHERE `id` = '"+ checkCart[0].id +"'";
                  pool.query(deleteFromCart,function(err,deleteFromCart){
                    if(err) {
                      console.log(err);
                      res.redirect(`/myPrograms?message=payment_failed`);
                    } else {
                      var end_date = new Date(new Date().getTime() + parseInt(90) * 24 * 60 * 60 * 1000);
                      var query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`,`session_count`,`trainer_program_id`) VALUES ('"+ item_id +"','"+ item_category +"','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"',0,'"+ trainer_program_id +"')";
                      pool.query(query,function(err,results,fields){
                          if(err) {
                            console.log(err);
                              res.redirect(`/myPrograms?message=payment_failed`);
                          } else {
                            array.push({
                              name:itemData[0].title,
                              quantity:1,
                              price:itemData[0].price
                            })
                            sendMail(req.query.user_id,array).then((result) => {
                              res.redirect(`/myPrograms?message=payment_successfull`);
                            }).catch((err) => {
                              res.redirect(`/myPrograms?message=payment_successfull`);
                            });
                          }
                      });
                    }
                  });
                } else {
                  var end_date = new Date(new Date().getTime() + parseInt(90) * 24 * 60 * 60 * 1000);
                  var query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`,`session_count`,`trainer_program_id`) VALUES ('"+ item_id +"','"+ item_category +"','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"',0,'"+ trainer_program_id +"')";
                  pool.query(query,function(err,results,fields){
                      if(err) {
                        console.log(err);
                          res.redirect(`/myPrograms?message=payment_failed`);
                      } else {
                        array.push({
                          name:itemData[0].title,
                          quantity:1,
                          price:itemData[0].price
                        })
                        sendMail(req.query.user_id,array).then((result) => {
                          res.redirect(`/myPrograms?message=payment_successfull`);
                        }).catch((err) => {
                          res.redirect(`/myPrograms?message=payment_successfull`);
                        });
                      }
                  });
                }
            }
        });
      });
    } else {
      res.redirect(`/myPrograms?message=payment_failed`);
    }
  });
});

router.post('/purchaseSingleItemMobile',function (req,res,next){
  var item_id = req.query.item_id;
  var item_category = 'program';
  var user_id = req.query.user_id;
  var trainer_program_id = req.query.trainer_program_id;
  var array = [];
  var itemData = "SELECT p.`title`,tp.`price` FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`id` = '"+item_id+"' AND tp.`id` = '"+ trainer_program_id +"'";
  var checkCart = "SELECT * FROM `cart` WHERE `item_category` = '"+ item_category +"' AND `item_id` = '"+ item_id +"' AND `user_id` = '"+ user_id +"' AND `cart_category` = 'cart' AND `trainer_program_id` = '"+ trainer_program_id +"'";
      pool.query(itemData,function(err,itemData){
          pool.query(checkCart,function(err,checkCart){
            if(err) {
              console.log(err);
                res.json({message:'Database_connection_error'});
            } else {
                if(checkCart.length != 0){
                  var deleteFromCart = "DELETE FROM `cart` WHERE `id` = '"+ checkCart[0].id +"'";
                  pool.query(deleteFromCart,function(err,deleteFromCart){
                    if(err) {
                      console.log(err);
                      res.json({
                        message:'payment_failed',
                      });
                    } else {
                      var end_date = new Date(new Date().getTime() + parseInt(90) * 24 * 60 * 60 * 1000);
                      var query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`,`session_count`,`trainer_program_id`) VALUES ('"+ item_id +"','"+ item_category +"','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"',0,'"+ trainer_program_id +"')";
                      pool.query(query,function(err,results,fields){
                          if(err) {
                            console.log(err);
                              res.json({
                                message:'payment_failed',
                              });
                          } else {
                            array.push({
                              name:itemData[0].title,
                              quantity:1,
                              price:itemData[0].price
                            })
                            sendMail(req.query.user_id,array).then((result) => {
                              res.json({
                                message:'payment_success',
                              });
                            }).catch((err) => {
                              res.json({
                                message:'payment_success',
                              });
                            });
                          }
                      });
                    }
                  });
                } else {
                  var end_date = new Date(new Date().getTime() + parseInt(90) * 24 * 60 * 60 * 1000);
                  var query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`,`session_count`,`trainer_program_id`) VALUES ('"+ item_id +"','"+ item_category +"','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"',0,'"+ trainer_program_id +"')";
                  pool.query(query,function(err,results,fields){
                      if(err) {
                        console.log(err);
                          res.json({
                            message:'payment_failed',
                          });
                      } else {
                        array.push({
                          name:itemData[0].title,
                          quantity:1,
                          price:itemData[0].price
                        })
                        sendMail(req.query.user_id,array).then((result) => {
                          res.json({
                            message:'payment_success',
                          });
                        }).catch((err) => {
                          res.json({
                            message:'payment_success',
                          });
                        });
                      }
                  });
                }
            }
        });
      });
});

router.post('/purchaseCartItem',function (req,res,next){
  var user_id = req.query.user_id;
  var array = [];
  instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == "captured") {
      var query = "SELECT c.`id` AS cartId,tp.*,p.`title`,p.`cover_photo`, t.`name` AS trainerName FROM `cart` c INNER JOIN `trainer_programs` tp ON tp.`id` = c.`trainer_program_id` INNER JOIN `programs` p ON p.`id` = c.`item_id` JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE c.`user_id` = '"+ user_id +"' ORDER BY c.`created_at` DESC";
       pool.query(query,function(err,query){
        if(err) {
          console.log(err);
          res.json({
              message:'Database_connection_error',
              data: [],
          });
        } else {
          if(query.length != 0) {
            var counter = 0;
            for (let i=0; i<query.length; i++) {
                task(i,query[i]);
            }

            function task(i,query) {
              var cartId = query.cartId;
              var deleteFromCart = "DELETE FROM `cart` WHERE `id` = '"+ cartId +"'";
                var end_date = new Date(new Date().getTime() + parseInt(90) * 24 * 60 * 60 * 1000);
                var finalQuery  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`,`session_count`,`trainer_program_id`) VALUES ('"+ query.program_id +"','program','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"',0,'"+ query.id +"')";
                pool.query(finalQuery,function(err,results){
                  pool.query(deleteFromCart,function(err,deleteFromCart){
                    if(err) {
                      console.log(err);
                      res.redirect(`/myPrograms?message=payment_failed`);
                    } else {
                      array.push({
                        name:query.title,
                        quantity:1,
                        price:query.price
                      });
                      counter++;
                      check_counter(counter,array);
                    }
                  });
                });
            }
              function check_counter(counter1,finalArray){
                if(counter1 == query.length){
                  sendMail(req.query.user_id,finalArray).then((result) => {
                    res.redirect(`/myPrograms?message=payment_successfull`);
                  }).catch((err) => {
                    res.redirect(`/myPrograms?message=payment_successfull`);
                  });
                }
              }
          }
        }       
      });
    } else {
      res.redirect(`/myPrograms?message=payment_failed`);
    }
  });
});


router.post('/purchaseCartItemMobile',function (req,res,next){
  var user_id = req.body.user_id;
  var query = "SELECT c.`id` AS cartId,tp.*,p.`title`,p.`cover_photo`, t.`name` AS trainerName FROM `cart` c INNER JOIN `trainer_programs` tp ON tp.`id` = c.`trainer_program_id` INNER JOIN `programs` p ON p.`id` = c.`item_id` JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE c.`user_id` = '"+ user_id +"' ORDER BY c.`created_at` DESC";
  var array = [];
       pool.query(query,function(err,query){
        if(err) {
          console.log(err);
          res.json({
              message:'Database_connection_error',
          });
        } else {
          if(query.length != 0) {
            var counter = 0;
            for (let i=0; i<query.length; i++) {
                task(i,query[i]);
            }

            function task(i,query) {
              var cartId = query.cartId;
              var deleteFromCart = "DELETE FROM `cart` WHERE `id` = '"+ cartId +"'";
                var end_date = new Date(new Date().getTime() + parseInt(90) * 24 * 60 * 60 * 1000);
                var finalQuery  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`,`session_count`,`trainer_program_id`) VALUES ('"+ query.program_id +"','program','"+ end_date.toISOString().slice(0, 19).replace('T', ' ') +"','"+ user_id +"',0,'"+ query.id +"')";
                pool.query(finalQuery,function(err,results){
                  pool.query(deleteFromCart,function(err,deleteFromCart){
                    if(err) {
                      console.log(err);
                      res.json({
                        message:'payment_failed',
                      });
                    } else {
                      array.push({
                        name:query.title,
                        quantity:1,
                        price:query.price
                      });
                      counter++;
                      check_counter(counter,array);
                    }
                  });
                });
            }
              function check_counter(counter1,finalArray){
                if(counter1 == query.length){
                  sendMail(req.body.user_id,finalArray).then((result) => {
                    res.json({
                      message:'payment_success',
                    });
                  }).catch((err) => {
                    res.json({
                      message:'payment_success',
                    });
                  });
                }
              }
          }
        }       
      });
});

module.exports = router;
