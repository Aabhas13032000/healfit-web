const express = require('express');
const router = express.Router();

//JSON WEB TOKEN
const { verify } = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

//Firebase dynamic links
const { FirebaseDynamicLinks } = require('firebase-dynamic-links');
const firebaseDynamicLinks = new FirebaseDynamicLinks('AIzaSyA1emjLa2Hvq37jMYfEfzK26geu4bniV1E');

//Firebase Admin
var admin = require("firebase-admin");
var serviceAccount = require("../../credentials/serviceKey.json");

/* Firebase option intialise */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  name: "adminNotification"
});

/* Notification Options */
const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

//JSON files
const sidebar = require('../../public/jsons/sidebar.json');

//Constants
const constants = require('../../controllers/constants');

//Renders
const render = require('../../controllers/admin')

//Middlewares
const middlewares = require('../../services/admin');

//database pool
const pool = require('../../database/connection');

/* Index. */
router.get('/', function(req, res, next) {
  if(constants.isDevelopment) {
    req.session.token = constants.devlopmentToken;
  }
  if(req.session.token){
    verify(req.session.token,accessTokenSecret,(err,decoded) => {
      if(err) {
        res.render('error');
      } else {
        res.render('admin/index',{
            sidebar:sidebar,
            name: decoded.name,
            phoneNumber: decoded.phoneNumber,
            image_path: decoded.image_path,
        });
      }
    });
  } else {
    if(req.query.error){
      res.render('admin/login/login',{
        message: req.query.error,
        message_class:'alert-danger'
      });
    } else {
      res.render('admin/login/login',{
        message:'You are logged out, Please Login again!!',
        message_class:'alert-warning'
      });
    }
  }
});

/* Logout */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/admin/');
  })
});

/*Login */
router.post('/login',middlewares.login);

//Get images
router.get('/getImages',middlewares.getImages);

/* Admin Profile */

//Main Page
router.get('/profile',middlewares.getAdminDetails,render.getAdminProfilePage);
// Update Password. 
router.post('/updateProfile', middlewares.updateProfile,middlewares.getAdminDetails,render.getAdminProfilePage);

//Create Dynamic Link
async function createDynamicLink(linkToCreate) {
  const { shortLink, previewLink } = await firebaseDynamicLinks.createLink({
      dynamicLinkInfo: {
        domainUriPrefix: 'https://healfit.page.link',
        link: linkToCreate,
        androidInfo: {
          androidPackageName: 'com.healfit.heal_fit',
        },
        iosInfo: {
          iosBundleId: 'com.healfit.healFit',
        },
      },
    });
  return shortLink;
}

//send notification
router.post('/sendNotification', function(req, res, next) {
  var title = req.body.title;
  var url = req.body.share_url;
  var description = req.body.description;
  var sql = "SELECT * FROM `user_devices` WHERE LENGTH(`device_id`) > 30";
  var registration_ids = [];
  if(url.length == 0 || url == 'null'){
      createDynamicLink(req.body.link).then((result) => {
          if(req.body.type == 'program'){
              var sql1 = "UPDATE `programs` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          } else if(req.body.type == 'book'){
            var sql1 = "UPDATE `books` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          } else if(req.body.type == 'blog'){
            var sql1 = "UPDATE `blog` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          } else if(req.body.type == 'product'){
            var sql1 = "UPDATE `products` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          }
          pool.query(sql1,function(err,data1){
              if(err) {
                  console.log(err);
                  res.jsonp({message:'failed'});
              } else {
                pool.query(sql,function(err,data){
                      if(data.length !=0) {
                          if(Math.ceil(data.length/500) > 1){
                              var number_of_times = 0;
                              check_counter(number_of_times);
                                 function check_counter(counter1){
                                     console.log(counter1);
                                   if(counter1 == Math.ceil(data.length/500)){
                                      res.jsonp({message:'success'});
                                   } else {
                                      setTimeout(function() {
                                          console.log(number_of_times);
                                          if(number_of_times<=Math.ceil(data.length/500)){
                                              registration_ids = [];
                                              for(var j=(number_of_times*500);j<((number_of_times+1)*500);j++){
                                                  if(data[j]!=undefined){
                                                      registration_ids.push(data[j].device_id);
                                                  }
                                              }
                                              var message = {
                                                  tokens: registration_ids,
                                                  notification: {
                                                      title: title,
                                                      body: description
                                                  },
                                                  android: {
                                                      notification: {
                                                        imageUrl: req.body.image
                                                      }
                                                  },
                                                  options: notification_options,
                                                  data : {
                                                      openURL : req.body.link
                                                  }
                                              };
                                  
                                              admin.messaging().sendMulticast(message).then((response) => {
                                                  console.log( response.successCount +' successfull');
                                                  console.log( response.failureCount +' not successfull');
                                                  number_of_times++;
                                                  check_counter(number_of_times);
                                              }).catch((err) => {
                                                  console.log(err);
                                                  res.jsonp({message:'failed'});
                                              })
                                          }
                                      }, 1000 * (number_of_times+1));
                                   }
                                 }
                          } else {
                              for (var i = 0; i < data.length; i++) {
                                  registration_ids.push(data[i].device_id);
                              }
                              var message = {
                                  tokens: registration_ids,
                                  notification: {
                                      title: title,
                                      body: description
                                  },
                                  android: {
                                      notification: {
                                        imageUrl: req.body.image
                                      }
                                  },
                                  data : {
                                      openURL : req.body.link
                                  },
                                  options: notification_options
                              };
                  
                              admin.messaging().sendMulticast(message).then((response) => {
                                  console.log( response.successCount +' successfull');
                                  console.log( response.failureCount +' not successfull');
                                  res.jsonp({message:'success'});
                              }).catch((err) => {
                                  console.log(err);
                                  res.jsonp({message:'failed'});
                              })
                          }
                      }
                  });
              }
          });
      }).catch((err) => {
          console.log(err);
      })
  } else {
    pool.query(sql,function(err,data){
          if(data.length !=0) {
              if(Math.ceil(data.length/500) > 1){
                  var number_of_times = 0;
                  check_counter(number_of_times);
                     function check_counter(counter1){
                         console.log(counter1);
                       if(counter1 == Math.ceil(data.length/500)){
                          res.jsonp({message:'success'});
                       } else {
                          setTimeout(function() {
                              console.log(number_of_times);
                              if(number_of_times<=Math.ceil(data.length/500)){
                                  registration_ids = [];
                                  for(var j=(number_of_times*500);j<((number_of_times+1)*500);j++){
                                      if(data[j]!=undefined){
                                          registration_ids.push(data[j].device_id);
                                      }
                                  }
                                  var message = {
                                      tokens: registration_ids,
                                      notification: {
                                          title: title,
                                          body: description
                                      },
                                      android: {
                                          notification: {
                                            imageUrl: req.body.image
                                          }
                                      },
                                      options: notification_options,
                                      data : {
                                          openURL : req.body.link
                                      }
                                  };
                      
                                  admin.messaging().sendMulticast(message).then((response) => {
                                      console.log( response.successCount +' successfull');
                                      console.log( response.failureCount +' not successfull');
                                      number_of_times++;
                                      check_counter(number_of_times);
                                  }).catch((err) => {
                                      console.log(err);
                                      res.jsonp({message:'failed'});
                                  })
                              }
                          }, 1000 * (number_of_times+1));
                       }
                     }
              } else {
                  for (var i = 0; i < data.length; i++) {
                      registration_ids.push(data[i].device_id);
                  }
                  var message = {
                      tokens: registration_ids,
                      notification: {
                          title: title,
                          body: description
                      },
                      android: {
                          notification: {
                            imageUrl: req.body.image
                          }
                      },
                      data : {
                          openURL : req.body.link
                      },
                      options: notification_options
                  };
      
                  admin.messaging().sendMulticast(message).then((response) => {
                      console.log( response.successCount +' successfull');
                      console.log( response.failureCount +' not successfull');
                      res.jsonp({message:'success'});
                  }).catch((err) => {
                      console.log(err);
                      res.jsonp({message:'failed'});
                  })
              }
          }
      });
  }
});


/* Reviews */

//Main Page
router.get('/reviews',render.getReviewsPage);

/* Social links */

//Main Page
router.get('/social_links',render.getSocialLinksPage);

/* Cuopons */

//Main Page
router.get('/coupons',render.getCouponPage);

module.exports = router;