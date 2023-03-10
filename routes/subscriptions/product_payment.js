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
    // pool: true,
    // secure: true, // use TLS
    // port: 465,// true for 465, false for other ports
    port: 587,
    secure: false,
    requireTLS: true,
    host: "smtp.gmail.com",
    auth: {
      // user: 'fitmangurugram@gmail.com',
      // pass: 'tphcsykeqlqkzydz',
      user: 'contact@healfit.in',
      pass: 'Lalit01**',
    },
});

router.get('/',function(req,res,next){
    res.json({message:'hello'});
});

//Subscription
var instance = new Razorpay({
  key_id: constants.razorpay_prduct_key_id, //TODO: change to production
  key_secret: constants.razorpay_product_key_secret,
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
          var string = '<body style="width: 100%;height: 100%;background-color: #ffffff;font-family: Arial, Helvetica, sans-serif;"> <div style="text-align:center"> <br><div style="text-align: center;width: 100%;"> <img src="http://healfit.in/images/local/curectLogo.png" alt="" style="width: 100px;"> </div><br><h1 style="text-align: center;font-weight: 200;">Thank you for purchasing !!</h1> <br><br><table style=" background-color: white; border-radius: 10px; border: 1px solid #E1F0F4; overflow: hidden; margin: auto;"> <thead style="font-size: 14px;"> <tr> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">#</th> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">ITEM</th> <th scope="col" style="font-family: Hellix-Medium; border-bottom: 1px solid #D9E7EA; padding: 15px 8px; font-size: 12px;">QUANTITY</th></tr></thead> <tbody>';
          var string2 = '';
          for(var i=0;i<array.length;i++){
            total = array[i].price;
            string2 = string2 + '<tr style="text-align: center;"> <td style="padding: 15px 8px; overflow: hidden;">'+ (i+1) +'</td><td style="padding: 15px 8px; overflow: hidden;">'+ array[i].name +'</td><td style="padding: 15px 8px; overflow: hidden;">'+ array[i].quantity +'</td></tr>';
          }
          var string3 = '</tbody> </table> <h3 style="text-align: center;padding: 15px 8px;">Total: Rs '+ total +'</h3> <p style="text-align: center;">To view more programs please visit our webiste</p><br><a href="https://curect.healfit.in/" style="background-color: #FFCE30;color: #080909;padding: 10px 30px;border-radius: 10px;text-decoration: none;" target="_blank">Click here</a> <br><br><p style="text-align: center;">Or download our application</p><br><a href="https://play.google.com/store/apps/details?id=com.healfit.heal_fit" style="border: 0 !important;" target="_blank"><img src="http://healfit.in//images/local/play_store.png" style="border-radius: 8px;" alt=""></a>&nbsp; <a href="https://apps.apple.com/in/app/healfit/id1645721639" style="border: 0 !important;"><img src="http://healfit.in//images/local/app_store.png" style="border-radius: 8px;" alt="" target="_blank"></a> </div></body>';
          var htmlString = string + string2 + string3;
          // console.log(htmlString);
          const mailData = {
            from: 'contact@healfit.in',  // sender address
            to: user[0].email,   // list of receivers
            subject: 'Curect purchased order details reciept',
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
          "key": constants.razorpay_prduct_key_id,
          "amount": parseFloat(req.body.total)*100,
          "currency": "INR",
          "name": req.body.companyName,
          "description": req.body.description,
          "image": constants.prodProductLogoImageUrl,
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

router.post('/purchaseCartItem',function (req,res,next){
  var user_id = req.query.user_id;
  var fullName = req.query.fullName;
  var phoneNumber = req.query.phoneNumber;
  var finalAddress = req.query.finalAddress;
  var price = req.query.price;
  var array = [];
  var query = "SELECT c.`id` AS cartId,c.`item_id`,c.`item_category`,c.`quantity`,c.`description`,p.`name`,p.`cover_photo`,p.`discount_price` FROM `cart` c INNER JOIN `products` p ON p.`id` = c.`item_id` WHERE c.`user_id` = '"+ user_id +"' AND c.`item_category` = 'product' ORDER BY c.`created_at` DESC";
  instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == "captured") {
        pool.query(query,function(err,query,fields){
          if(err) {
            console.log(err);
            res.redirect(`/myOrders?message=payment_failed`);
          } else {
            if(query.length != 0) {
              var counter = 0;
              for (let i=0; i<query.length; i++) {
                  task(i,query[i]);
              }
  
              function task(i,query) {
                var cartId = query.cartId;
                var deleteFromCart = "DELETE FROM `cart` WHERE `id` = '"+ cartId +"'";
                  var finalQuery  = "INSERT INTO `orders` (`order_id`,`payment_status`,`payment_method`,`quantity`,`paid_price`,`full_name`,`phoneNumber`,`address`,`details`,`item_category`,`item_id`,`user_id`) VALUES ('"+ req.body.razorpay_payment_id +"','done','online','"+ query.quantity +"','"+ price +"','"+ fullName +"','"+ phoneNumber +"','"+ finalAddress +"','"+ query.description +"','product','"+ query.item_id +"','"+ user_id +"')";
                  var updateQuantity  = "UPDATE `product_size_quantity` SET `quantity` = `quantity` - 1  WHERE `size` = '"+ query.description +"' AND `item_id` = '"+ query.item_id +"'";
                  pool.query(finalQuery,function(err,results){
                    pool.query(deleteFromCart,function(err,deleteFromCart){
                      pool.query(updateQuantity,function(err,updateQuantity){
                        if(err) {
                          console.log(err);
                          res.redirect(`/myOrders?message=payment_failed`);
                        } else {
                          array.push({
                            name: query.name,
                            quantity: query.quantity,
                            price: price
                          });
                          counter++;
                          check_counter(counter,array);
                        }
                      });
                    });
                  });
              }
                function check_counter(counter1,finalArray){
                  if(counter1 == query.length){
                    sendMail(req.query.user_id,finalArray).then((result) => {
                      res.redirect(`/myOrders?message=payment_successfull`);
                    }).catch((err) => {
                      res.redirect(`/myOrders?message=payment_successfull`);
                    });
                  }
                }
            } else {
              res.redirect(`/myOrders?message=payment_failed`);
            }
          }
        });
    } else {
      res.redirect(`/myOrders?message=payment_failed`);
    }
  });
});


router.post('/purchaseCartItemMobile',function (req,res,next){
  var user_id = req.body.user_id;
  var fullName = req.body.fullName;
  var phoneNumber = req.body.phoneNumber;
  var finalAddress = req.body.finalAddress;
  var price = req.body.price;
  var array = [];
  var query = "SELECT c.`id` AS cartId,c.`item_id`,c.`item_category`,c.`quantity`,c.`description`,p.`name`,p.`cover_photo`,p.`discount_price` FROM `cart` c INNER JOIN `products` p ON p.`id` = c.`item_id` WHERE c.`user_id` = '"+ user_id +"' AND c.`item_category` = 'product' ORDER BY c.`created_at` DESC";
  pool.query(query,function(err,query,fields){
    if(err) {
      console.log(err);
      res.json({
        message:'payment_failed',
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
            var finalQuery  = "INSERT INTO `orders` (`order_id`,`payment_status`,`payment_method`,`quantity`,`paid_price`,`full_name`,`phoneNumber`,`address`,`details`,`item_category`,`item_id`,`user_id`) VALUES ('"+ (user_id+'_'+query.item_id) +"','pending','COD','"+ query.quantity +"','"+ price +"','"+ fullName +"','"+ phoneNumber +"','"+ finalAddress +"','"+ query.description +"','product','"+ query.item_id +"','"+ user_id +"')";
            var updateQuantity  = "UPDATE `product_size_quantity` SET `quantity` = `quantity` - 1  WHERE `size` = '"+ query.description +"' AND `item_id` = '"+ query.item_id +"'";
            pool.query(finalQuery,function(err,results){
              pool.query(deleteFromCart,function(err,deleteFromCart){
                pool.query(updateQuantity,function(err,updateQuantity){
                  if(err) {
                    console.log(err);
                    res.json({
                      message:'payment_failed',
                    });
                  } else {
                    array.push({
                      name: query.name,
                      quantity: query.quantity,
                      price: price
                    });
                    counter++;
                    check_counter(counter,array);
                  }
                });
              });
            });
        }
          function check_counter(counter1,finalArray){
            if(counter1 == query.length){
              sendMail(req.query.user_id,finalArray).then((result) => {
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
      } else {
        res.json({
          message:'payment_failed',
        });
      }
    }
  });
});

router.post('/purchaseSingleItem',function (req,res,next){
  var user_id = req.query.user_id;
  var fullName = req.query.fullName;
  var phoneNumber = req.query.phoneNumber;
  var finalAddress = req.query.finalAddress;
  var description = req.query.description;
  var quantity = req.query.quantity;
  var item_id = req.query.item_id;
  var price = req.query.price;
  var productName = req.query.productName;
  var array = [];
  var finalQuery  = "INSERT INTO `orders` (`order_id`,`payment_status`,`payment_method`,`quantity`,`paid_price`,`full_name`,`phoneNumber`,`address`,`details`,`item_category`,`item_id`,`user_id`) VALUES ('"+ req.body.razorpay_payment_id +"','done','online','"+ quantity +"','"+ price +"','"+ fullName +"','"+ phoneNumber +"','"+ finalAddress +"','"+ description +"','product','"+ item_id +"','"+ user_id +"')";
  var updateQuantity  = "UPDATE `product_size_quantity` SET `quantity` = `quantity` - 1  WHERE `size` = '"+ description +"' AND `item_id` = '"+ item_id +"'";
  instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if (paymentDocument.status == "captured") {
      pool.query(finalQuery,function(err,results){
        pool.query(updateQuantity,function(err,updateQuantity){
          if(err) {
            console.log(err);
            res.redirect(`/myOrders?message=payment_failed`);
          } else {
            array.push({
              name:productName,
              quantity:quantity,
              price:price
            });
            sendMail(req.query.user_id,array).then((result) => {
              res.redirect(`/myOrders?message=payment_successfull`);
            }).catch((err) => {
              res.redirect(`/myOrders?message=payment_successfull`);
            });
          }
        });
      });
    } else {
      res.redirect(`/myOrders?message=payment_failed`);
    }
  });
});

router.post('/purchaseSingleItemMobile',function (req,res,next){
  var user_id = req.body.user_id;
  var fullName = req.body.fullName;
  var phoneNumber = req.body.phoneNumber;
  var finalAddress = req.body.finalAddress;
  var description = req.body.description;
  var quantity = req.body.quantity;
  var item_id = req.body.item_id;
  var price = req.body.price;
  var productName = req.body.productName;
  var paymentMethod = req.body.paymentMethod;
  var array = [];
  var finalQuery  = "INSERT INTO `orders` (`order_id`,`payment_status`,`payment_method`,`quantity`,`paid_price`,`full_name`,`phoneNumber`,`address`,`details`,`item_category`,`item_id`,`user_id`) VALUES ('"+ (user_id+'_'+item_id) +"','pending','"+ paymentMethod +"','"+ quantity +"','"+ price +"','"+ fullName +"','"+ phoneNumber +"','"+ finalAddress +"','"+ description +"','product','"+ item_id +"','"+ user_id +"')";
  var updateQuantity  = "UPDATE `product_size_quantity` SET `quantity` = `quantity` - 1  WHERE `size` = '"+ description +"' AND `item_id` = '"+ item_id +"'";
  pool.query(finalQuery,function(err,results){
    pool.query(updateQuantity,function(err,updateQuantity){
      if(err) {
        console.log(err);
        res.json({
          message:'payment_failed',
        });
      } else {
        array.push({
          name:productName,
          quantity:quantity,
          price:price
        });
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

module.exports = router;
