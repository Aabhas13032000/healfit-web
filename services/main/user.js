const { query } = require('express');
const pool = require('../../database/connection');

//Firebase dynamic links
const { FirebaseDynamicLinks } = require('firebase-dynamic-links');
const firebaseDynamicLinks = new FirebaseDynamicLinks('AIzaSyA1emjLa2Hvq37jMYfEfzK26geu4bniV1E');


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

module.exports = {
    createUser: (req, res, next) => {
        if(req.headers.token) {
          var isShowForceUpdate = false;
          var isShowUpdate =  false;
          if(req.headers.app_version){
            // console.log(req.headers.app_version);
            if(req.headers.platform == 'ANDROID') {
              if(req.headers.app_version != '1.1.0'){
                isShowForceUpdate = false;
                isShowUpdate =  false;
              }
            } else if(req.headers.platform == 'IOS') {
              if(req.headers.app_version != '1.1.0'){
                isShowForceUpdate = false;
                isShowUpdate =  false;
              }
            }
          }
            const user = "SELECT u.*,ud.`logged_in`,ud.`is_otp_verified` FROM `user_devices` ud INNER JOIN `users` u ON u.`id` = ud.`user_id` WHERE ud.`device_id` = '"+ req.headers.token +"' AND ud.`device` = '"+ req.headers.platform +"'";
            var date = new Date();
            pool.query(user,function(err,user){
              if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      user:[],
                      isShowForceUpdate : false,
                      isShowUpdate : false,
                  });
              } else {
                if(user.length !=0){ 
                  res.json({
                    message:'User_Authenticated_successfully',
                    user:user,
                    isShowForceUpdate : isShowForceUpdate,
                    isShowUpdate : isShowUpdate,
                  });
                } else {
                  const insertUser  = "INSERT INTO `users` (`device_id`,`device`) VALUES ('"+ req.headers.token +"','"+ req.headers.platform +"')";
                  pool.query(insertUser,function(err,insertUser){
                    const insertUserId  = "INSERT INTO `user_devices` (`user_id`,`device_id`,`device`) VALUES ('"+ insertUser.insertId +"','"+ req.headers.token +"','"+ req.headers.platform +"')";
                    pool.query(insertUserId,function(err,insertUserId){
                      if(err) {
                        console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            user:[],
                            isShowForceUpdate : false,
                            isShowUpdate : false,
                        });
                      } else { 
                        res.json({
                          message:'User_created_successfully',
                          user:[
                            {
                              id: insertUser.insertId,
                              name: "",
                              email: "",
                              gender: "",
                              age: 0,
                              weight: 0,
                              target_weight: 0,
                              logged_in: 0,
                              device_id: req.headers.token,
                              profile_image: "",
                              phoneNumber: "",
                              height: 0,
                              device: req.headers.platform,
                              status: "ACTIVE",
                              is_otp_verified: 0,
                              created_at: date.toISOString()
                            }
                          ],
                          isShowForceUpdate : isShowForceUpdate,
                          isShowUpdate : isShowUpdate,
                        });
                      }
                    });
                  });
                }
              }
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
              user:[],
              isShowForceUpdate : false,
              isShowUpdate : false,
            });
          }
    },
    updatePhoneNumber : (req, res, next) => {
        var date = new Date();
        // console.log(req.headers.token);
        if(req.headers.token) {
          const user = "SELECT u.*,ud.`logged_in`,ud.`is_otp_verified` FROM `user_devices` ud INNER JOIN `users` u ON u.`id` = ud.`user_id` WHERE ud.`device_id` = '"+ req.headers.token +"' AND ud.`device` = '"+ req.headers.platform +"'";
          pool.query(user,function(err,user){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    user:[],
                });
            } else {
              if(user.length !=0){
                if(user[0].phoneNumber == req.body.phoneNumber) {
                  if(user[0].name == null || user[0].name.length == 0 || user[0].age == null || user[0].age == 0 || user[0].age == '0') {
                    const updateUserDevice = "UPDATE `user_devices` SET `logged_in` = 0,`is_otp_verified` = 1 WHERE `user_id` = '"+ user[0].id +"' AND `device` = '"+ req.headers.platform +"' AND `device_id` = '"+ req.headers.token +"'";
                    pool.query(updateUserDevice,function(err,updateUserDevice){
                      if(err) {
                        console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            user:[],
                        });
                      } else { 
                        user[0].logged_in = 0;
                        user[0].is_otp_verified = 1;
                        res.json({
                          message:'Updated_successfully',
                          user: user
                        });
                      }
                    });
                  } else {
                    const updateUserDevice = "UPDATE `user_devices` SET `logged_in` = 1,`is_otp_verified` = 1 WHERE `user_id` = '"+ user[0].id +"' AND `device` = '"+ req.headers.platform +"' AND `device_id` = '"+ req.headers.token +"'";
                    pool.query(updateUserDevice,function(err,updateUserDevice){
                      if(err) {
                        console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            user:[],
                        });
                      } else { 
                        user[0].logged_in = 1;
                        user[0].is_otp_verified = 1;
                        res.json({
                          message:'Updated_successfully',
                          user: user
                        });
                      }
                    });
                  }
                } else {
                  const checkUser = "SELECT * FROM `users` WHERE `phoneNumber` = '"+ req.body.phoneNumber +"'";
                  pool.query(checkUser,function(err,checkUser){
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            user:[],
                        });
                    } else {
                      if(checkUser.length != 0){
                        if(checkUser[0].name == null || checkUser[0].name.length == 0 || checkUser[0].age == null || checkUser[0].age == 0 || checkUser[0].age == '0') {
                          const updateUserDevice = "UPDATE `user_devices` SET `logged_in` = 0, `user_id` = '"+ checkUser[0].id +"',`is_otp_verified` = 1 WHERE `device` = '"+ req.headers.platform +"' AND `device_id` = '"+ req.headers.token +"'";
                          pool.query(updateUserDevice,function(err,updateUserDevice){
                            if(err) {
                              console.log(err);
                              res.json({
                                  message:'Database_connection_error',
                                  user:[],
                              });
                            } else { 
                              checkUser[0].logged_in = 0;
                              checkUser[0].is_otp_verified = 1;
                              res.json({
                                message:'Updated_successfully',
                                user: checkUser
                              });
                            }
                          });
                        } else {
                          const updateUserDevice = "UPDATE `user_devices` SET `logged_in` = 1, `user_id` = '"+ checkUser[0].id +"',`is_otp_verified` = 1 WHERE `device` = '"+ req.headers.platform +"' AND `device_id` = '"+ req.headers.token +"'";
                          pool.query(updateUserDevice,function(err,updateUserDevice){
                            if(err) {
                              console.log(err);
                              res.json({
                                  message:'Database_connection_error',
                                  user:[],
                              });
                            } else { 
                              checkUser[0].logged_in = 1;
                              checkUser[0].is_otp_verified = 1;
                              res.json({
                                message:'Updated_successfully',
                                user: checkUser
                              });
                            }
                          });
                        }
                      } else {
                        const insertUser  = "INSERT INTO `users` (`device_id`,`device`,`phoneNumber`) VALUES ('"+ req.headers.token +"','"+ req.headers.platform +"','"+ req.body.phoneNumber +"')";
                        const deleteUser = "DELETE FROM `users` WHERE `device_id` = '"+ req.headers.token +"' AND `phoneNumber` = '+910000000000'";
                        pool.query(insertUser,function(err,insertUser){
                          const updateUserDevice = "UPDATE `user_devices` SET `logged_in` = 0, `user_id` = '"+ insertUser.insertId +"',`is_otp_verified` = 1 WHERE `device` = '"+ req.headers.platform +"' AND `device_id` = '"+ req.headers.token +"'";
                          pool.query(updateUserDevice,function(err,updateUserDevice){
                            if(err) {
                              console.log(err);
                              res.json({
                                  message:'Database_connection_error',
                                  user:[],
                              });
                            } else { 
                              pool.query(deleteUser,function(err,deleteUser){
                                res.json({
                                  message:'Updated_successfully',
                                  user:[
                                    {
                                      id: insertUser.insertId,
                                      name: "",
                                      email: "",
                                      gender: "",
                                      age: 0,
                                      weight: 0,
                                      target_weight: 0,
                                      logged_in: 0,
                                      device_id: req.headers.token,
                                      profile_image: "",
                                      phoneNumber: req.body.phoneNumber,
                                      height: 0,
                                      device: req.headers.platform,
                                      status: "ACTIVE",
                                      is_otp_verified: 1,
                                      created_at: date.toISOString()
                                    }
                                  ],
                                });
                              });
                            }
                          });
                        });
                      }
                    }
                  });
                }
              } else {
                const insertUser  = "INSERT INTO `users` (`device_id`,`device`,`phoneNumber`) VALUES ('"+ req.headers.token +"','"+ req.headers.platform +"','"+ req.body.phoneNumber +"')";
                const deleteUser = "DELETE FROM `users` WHERE `device_id` = '"+ req.headers.token +"' AND `phoneNumber` = '+910000000000'";
                pool.query(insertUser,function(err,insertUser){
                  const insertUserId  = "INSERT INTO `user_devices` (`user_id`,`device_id`,`device`,`is_otp_verified`) VALUES ('"+ insertUser.insertId +"','"+ req.headers.token +"','"+ req.headers.platform +"',1)";
                  pool.query(insertUserId,function(err,insertUserId){
                    if(err) {
                      console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          user:[],
                      });
                    } else { 
                      pool.query(deleteUser,function(err,deleteUser){
                        res.json({
                          message:'Updated_successfully',
                          user:[
                            {
                              id: insertUser.insertId,
                              name: "",
                              email: "",
                              gender: "",
                              age: 0,
                              weight: 0,
                              target_weight: 0,
                              logged_in: 0,
                              device_id: req.headers.token,
                              profile_image: "",
                              phoneNumber: req.body.phoneNumber,
                              height: 0,
                              device: req.headers.platform,
                              status: "ACTIVE",
                              is_otp_verified: 1,
                              created_at: date.toISOString()
                            }
                          ],
                        });
                      });
                    }
                  });
                });
              }
            }
          });
        } else {
            res.json({
            message : 'Auth_token_failure',
            user:[],
            });
        }
      },
      updateData : (req,res,next) => {
        var date = new Date();
        if(req.headers.token) {
            const user = "UPDATE `users` SET `name` = '"+ req.body.name +"',`email` = '"+ req.body.email +"',`gender` = '"+ req.body.gender +"',`age` = '"+ req.body.age +"',`weight` = '"+ req.body.weight +"',`target_weight` = '"+ req.body.target_weight +"',`profile_image` = '"+ req.body.profile_image +"',`height` = '"+ req.body.height +"' WHERE `id` = '"+ req.body.user_id +"'";
            const userId = "UPDATE `user_devices` SET `logged_in` = 1 WHERE `device_id` = '"+ req.headers.token +"'";
            pool.query(user,function(err,user){
              pool.query(userId,function(err,userId){
                if(err) {
                  console.log(err);
                    res.json({
                        message:'Database_connection_error',
                        user:[],
                    });
                } else {
                    res.json({
                    message:'Updated_successfully',
                    user:[
                      {
                        id: req.body.user_id,
                        name: req.body.name,
                        email: req.body.email,
                        gender: req.body.gender,
                        age: parseInt(req.body.age.toString()),
                        weight: req.body.weight,
                        target_weight: req.body.target_weight,
                        logged_in: 1,
                        device_id: req.headers.token,
                        profile_image: req.body.profile_image,
                        phoneNumber: req.body.phoneNumber,
                        height: req.body.height,
                        device: req.headers.platform,
                        status: "ACTIVE",
                        is_otp_verified: 1,
                        created_at: date.toISOString()
                      }
                    ],
                    });
                }
              });
            });
        } else {
            res.json({
            message : 'Auth_token_failure',
            user:[],
            });
        }
      },
      updateApperalData : (req,res,next) => {
        var date = new Date();
        if(req.headers.token) {
            const user = "UPDATE `users` SET `name` = '"+ req.body.name +"',`email` = '"+ req.body.email +"',`gender` = '"+ req.body.gender +"',`profile_image` = '"+ req.body.profile_image +"' WHERE `id` = '"+ req.body.user_id +"'";
            const userId = "UPDATE `user_devices` SET `logged_in` = 1 WHERE `device_id` = '"+ req.headers.token +"'";
            pool.query(user,function(err,user){
              pool.query(userId,function(err,userId){
                if(err) {
                  console.log(err);
                    res.json({
                        message:'Database_connection_error',
                        user:[],
                    });
                } else {
                    res.json({
                    message:'Updated_successfully',
                    user:[],
                    });
                }
              });
            });
        } else {
            res.json({
            message : 'Auth_token_failure',
            user:[],
            });
        }
      },
      getUserProfile : (req,res,next) => {
        var date = new Date();
        if(req.headers.token) {
            const user = "SELECT * FROM `users` WHERE `device_id` = '"+ req.headers.token +"'";
            pool.query(user,function(err,user){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    user:[],
                });
            } else {
                res.json({
                message:'success',
                user:user
                });
            }
            });
        } else {
            res.json({
            message : 'Auth_token_failure',
            user:[],
            });
        }
      },
      generateShareLink: (req,res,next) => {
        createDynamicLink(req.body.link).then((result) => {
          if(req.body.type == 'program'){
              var sql1 = "UPDATE `programs` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          } else if(req.body.type == 'book'){
            var sql1 = "UPDATE `books` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          } else if(req.body.type == 'blog'){
            var sql1 = "UPDATE `blog` SET `share_url` = '"+ result +"' WHERE `id` = '"+ req.body.item_id +"'";
          }
          pool.query(sql1,function(err,data1){
              if(err) {
                  console.log(err);
                  res.json({
                    message:'failed',
                    shareLink: '',
                  });
              } else {
                res.json({
                  message:'success',
                  shareLink: result,
                });
              }
          });
        }).catch((err) => {
            console.log(err);
            res.json({
                message : 'failed',
                shareLink: '',
              });
        })
      },
      logout: (req,res,next) => {
        var user_id = req.body.user_id;
        if(req.headers.token) {
            var updateLoggedIn = "UPDATE `user_devices` SET `logged_in` = 0,`is_otp_verified` = '0' WHERE `user_id` = '"+ user_id +"' AND `device` = '"+ req.headers.platform +"' AND `device_id` = '"+ req.headers.token +"'";
            pool.query(updateLoggedIn,function(err,updateLoggedIn){
              if(err) {
                console.log(err);
                res.json({
                    message:'Database_connection_error',
                });
              } else {
                res.json({
                    message:'success_logout',
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