var cron = require('node-cron');

//weeks
var weeks = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

//Firebase Admin
var admin = require("firebase-admin");

/* Notification Options */
const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

//database pool
const pool = require('../../database/connection');

async function sendNotification(data,title,description,link) {
  var registration_ids = [];
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
                              },
                              options: notification_options,
                              data : {
                                  openURL : link
                              }
                          };
              
                          admin.messaging().sendMulticast(message).then((response) => {
                              console.log( response.successCount +' successfull');
                              console.log( response.failureCount +' not successfull');
                              number_of_times++;
                              check_counter(number_of_times);
                          }).catch((err) => {
                              console.log(err);
                              return false;
                          })
                      } else {
                        return true;
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
              },
              data : {
                  openURL : link
              },
              options: notification_options
          };

          admin.messaging().sendMulticast(message).then((response) => {
              console.log( response.successCount +' successfull');
              console.log( response.failureCount +' not successfull');
              return true;
          }).catch((err) => {
              console.log(err);
              return false;
          })
      }
  }
}

/* ---------------------- */

//For subscribed program
cron.schedule('45 05 * * *', () => {
  console.log('Notification for session at 06:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '06:00-07:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '06:00-07:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 06 * * *', () => {
  console.log('Notification for session at 07:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '07:00-08:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '07:00-08:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 07 * * *', () => {
  console.log('Notification for session at 08:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '08:00-09:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '08:00-09:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 08 * * *', () => {
  console.log('Notification for session at 09:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '09:00-10:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '09:00-10:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

/* ---------------------- */

//For calorie and workout

// cron.schedule('00 10 * * *', () => {
//   console.log('Notification for no entries for breakfast at 10:00 a.m');
//   var date = new Date();
//   var sql = "SELECT ud.`device_id`, ud.`user_id` FROM `user_devices` ud WHERE ud.logged_in = 1 AND (SELECT COUNT(*) FROM `user_calories` uc WHERE uc.`user_id` = ud.`user_id` AND uc.`meal` = 'BREAKFAST' AND uc.created_at LIKE '%"+ date.toISOString().split('T')[0] +"%') = 0";
//   pool.query(sql,function(err,data){
//       sendNotification(data,'Calorie counter','Please fill up your breakfast data',`/foodCalories?date=${date.toISOString().split('T')[0]}`).then((result) => {
//         var userIds = [];
//         for(var i =0;i<data.length;i++) {
//           if(!userIds.includes(data[i].user_id)) {
//             var query = "INSERT INTO `notifications` (`message`,`item_category`,`type`,`user_id`) VALUES ('Please fill you breakfast data for today and get a record of how much calories you had eaten today','exercise','REMINDER','"+ data[i].user_id +"')";
//             pool.query(query,function(err,data){});
//             userIds.push(data[i].user_id);
//           }
//         }
//         console.log('success' + result);
//       }).catch((err) => {
//         console.log('error' + err);
//       });
//   });
// });

// cron.schedule('00 14 * * *', () => {
//   console.log('Notification for no entries for lunch at 02:00 p.m.');
//   var date = new Date();
//   var sql = "SELECT ud.`device_id`, ud.`user_id` FROM `user_devices` ud WHERE ud.logged_in = 1 AND (SELECT COUNT(*) FROM `user_calories` uc WHERE uc.`user_id` = ud.`user_id` AND uc.`meal` = 'LUNCH' AND uc.created_at LIKE '%"+ date.toISOString().split('T')[0] +"%') = 0";
//   pool.query(sql,function(err,data){
//       sendNotification(data,'Calorie counter','Please fill up your lunch data',`/foodCalories?date=${date.toISOString().split('T')[0]}`).then((result) => {
//         var userIds = [];
//         for(var i =0;i<data.length;i++) {
//           if(!userIds.includes(data[i].user_id)) {
//             var query = "INSERT INTO `notifications` (`message`,`item_category`,`type`,`user_id`) VALUES ('Please fill you lunch data for today and get a record of how much calories you had eaten today','exercise','REMINDER','"+ data[i].user_id +"')";
//             pool.query(query,function(err,data){});
//             userIds.push(data[i].user_id);
//           }
//         }
//         console.log('success' + result);
//       }).catch((err) => {
//         console.log('error' + err);
//       });
//   });
// });

/* ---------------------- */

//For subscribed program
cron.schedule('45 14 * * *', () => {
  console.log('Notification for session at 15:00 a.m');
  var date = new Date();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '15:00-16:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '15:00-16:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 15 * * *', () => {
  console.log('Notification for session at 16:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '16:00-17:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '16:00-17:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 16 * * *', () => {
  console.log('Notification for session at 17:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '17:00-18:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '17:00-18:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});


/* ---------------------- */

//For calorie

// cron.schedule('00 17 * * *', () => {
//   console.log('Notification for no entries for snacks at 05:00 p.m.');
//   var date = new Date();
//   var sql = "SELECT ud.`device_id`, ud.`user_id` FROM `user_devices` ud WHERE ud.logged_in = 1 AND (SELECT COUNT(*) FROM `user_calories` uc WHERE uc.`user_id` = ud.`user_id` AND uc.`meal` = 'SNACKS' AND uc.created_at LIKE '%"+ date.toISOString().split('T')[0] +"%') = 0";
//   pool.query(sql,function(err,data){
//       sendNotification(data,'Calorie counter','Please fill up your snacks data',`/foodCalories?date=${date.toISOString().split('T')[0]}`).then((result) => {
//         var userIds = [];
//         for(var i =0;i<data.length;i++) {
//           if(!userIds.includes(data[i].user_id)) {
//             var query = "INSERT INTO `notifications` (`message`,`item_category`,`type`,`user_id`) VALUES ('Please fill you snacks data for today and get a record of how much calories you had eaten today','exercise','REMINDER','"+ data[i].user_id +"')";
//             pool.query(query,function(err,data){});
//             userIds.push(data[i].user_id);
//           }
//         }
//         console.log('success' + result);
//       }).catch((err) => {
//         console.log('error' + err);
//       });
//   });
// });

/* ---------------------- */

//For subscribed program
cron.schedule('45 17 * * *', () => {
  console.log('Notification for session at 18:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '18:00-19:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '18:00-19:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 18 * * *', () => {
  console.log('Notification for session at 19:00 a.m');
  var date = new Date();
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '19:00-20:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '19:00-20:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('45 19 * * *', () => {
  console.log('Notification for session at 20:00 a.m');
  var day = date.getDay();
  if(day == 7){
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '20:00-21:00' AND (tp.`day_id` = 'All 7 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  } else {
    var sql = "SELECT ud.`device_id`,ud.`user_id` FROM `subscription` s INNER JOIN `trainer_programs` tp ON tp.id = s.trainer_program_id INNER JOIN `user_devices` ud ON ud.`user_id` = s.`user_id` WHERE s.`status` = 1 AND tp.`time_id` = '20:00-21:00' AND (tp.`day_id` = 'All 6 days' OR tp.`day_id` LIKE '%"+ weeks[day - 1] +"%')";
  }
  pool.query(sql,function(err,data){
      sendNotification(data,'Session','Your session is starting in 15 mins','myPrograms').then((result) => {
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

/* ---------------------- */

//For calorie
// cron.schedule('00 22 * * *', () => {
//   console.log('Notification for no entries for dinner at 10:00 p.m.');
//   var date = new Date();
//   var sql = "SELECT ud.`device_id`, ud.`user_id` FROM `user_devices` ud WHERE ud.logged_in = 1 AND (SELECT COUNT(*) FROM `user_calories` uc WHERE uc.`user_id` = ud.`user_id` AND uc.`meal` = 'DINNER' AND uc.created_at LIKE '%"+ date.toISOString().split('T')[0] +"%') = 0";
//   pool.query(sql,function(err,data){
//       sendNotification(data,'Calorie counter','Please fill up your dinner data',`/foodCalories?date=${date.toISOString().split('T')[0]}`).then((result) => {
//         var userIds = [];
//         for(var i =0;i<data.length;i++) {
//           if(!userIds.includes(data[i].user_id)) {
//             var query = "INSERT INTO `notifications` (`message`,`item_category`,`type`,`user_id`) VALUES ('Please fill you dinner data for today and get a record of how much calories you had eaten today','exercise','REMINDER','"+ data[i].user_id +"')";
//             pool.query(query,function(err,data){});
//             userIds.push(data[i].user_id);
//           }
//         }
//         console.log('success' + result);
//       }).catch((err) => {
//         console.log('error' + err);
//       });
//   });
// });

cron.schedule('00 23 * * *', () => {
  console.log('Notification for no entries for calorie at 11:00 p.m.');
  var date = new Date();
  var sql = "SELECT ud.`device_id`, ud.`user_id` FROM `user_devices` ud WHERE ud.logged_in = 1 AND (SELECT COUNT(*) FROM `user_calories` uc WHERE uc.`user_id` = ud.`user_id` AND uc.created_at LIKE '%"+ date.toISOString().split('T')[0] +"%') = 0";
  pool.query(sql,function(err,data){
      sendNotification(data,'Calorie counter','Please fill up your food calorie data',`/foodCalories?date=${date.toISOString().split('T')[0]}`).then((result) => {
        var userIds = [];
        for(var i =0;i<data.length;i++) {
          if(!userIds.includes(data[i].user_id)) {
            var query = "INSERT INTO `notifications` (`message`,`item_category`,`type`,`user_id`) VALUES ('Please fill your calorie eaten data for today','exercise','REMINDER','"+ data[i].user_id +"')";
            pool.query(query,function(err,data){});
            userIds.push(data[i].user_id);
          }
        }
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});

cron.schedule('15 23 * * *', () => {
  console.log('Notification for no entries for workout at 11:15 p.m');
  var date = new Date();
  var sql = "SELECT ud.`device_id`, ud.`user_id` FROM `user_devices` ud WHERE ud.logged_in = 1 AND (SELECT COUNT(*) FROM `user_exercise` uc WHERE uc.`user_id` = ud.`user_id` AND uc.created_at LIKE '%"+ date.toISOString().split('T')[0] +"%') = 0";
  pool.query(sql,function(err,data){
      sendNotification(data,'Workout log','Please fill up your workout log for today',`/exerciseCalories?date=${date.toISOString().split('T')[0]}`).then((result) => {
        var userIds = [];
        for(var i =0;i<data.length;i++) {
          if(!userIds.includes(data[i].user_id)) {
            var query = "INSERT INTO `notifications` (`message`,`item_category`,`type`,`user_id`) VALUES ('Please fill your workout log for today','calorie','REMINDER','"+ data[i].user_id +"')";
            pool.query(query,function(err,data){});
            userIds.push(data[i].user_id);
          }
        }
        console.log('success' + result);
      }).catch((err) => {
        console.log('error' + err);
      });
  });
});