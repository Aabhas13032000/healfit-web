const pool = require('../../database/connection');

module.exports = {
    //Get user details
    getPrograms: (req,res,next) => {
        if(req.headers.token) {
            var offset = req.query.offset;
            var topSelling = "SELECT p.*, (SELECT MIN(tp.`price`) AS price FROM `trainer_programs` tp WHERE tp.`program_id` = p.`id`) AS price FROM `programs` p WHERE p.`status` = 1 AND p.`category` LIKE '%Top Selling%' ORDER BY p.`created_at` DESC";
            var morePrograms = "SELECT p.*, (SELECT MIN(tp.`price`) AS price FROM `trainer_programs` tp WHERE tp.`program_id` = p.`id`) AS price FROM `programs` p WHERE p.`status` = 1 AND p.`category` LIKE '%All%' ORDER BY p.`created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            var total = "SELECT COUNT(*) AS total FROM `programs` WHERE `status` = 1 AND `category` LIKE '%All%'";
            pool.query(topSelling,function(err,topSelling){
              pool.query(morePrograms,function(err,morePrograms){
                pool.query(total,function(err,total){
                  if(err) {
                    console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          topSelling: [],
                          morePrograms:[],
                          total:0,
                      });
                  } else {
                    res.json({
                      message:'success',
                      topSelling:topSelling,
                      morePrograms:morePrograms,
                      total: total.length != 0 ? total[0].total : 0,
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
    getUserPrograms: (req,res,next) => {
      if(req.headers.token) {
        var subscription = "SELECT s.`id` AS subscriptionId,s.`pdf_path`,s.`session_count`,s.`item_id`,p.title,p.cover_photo,t.`name` AS trainerName,tp.day_id ,tp.session_type,tp.session_id,tp.meeting_url,tp.time_id, (tp.`session_id` - s.`session_count`) AS days_left FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE s.`user_id` = '"+ req.query.user_id +"' AND p.`category` NOT LIKE '%Blocked%' AND (tp.`session_id` - s.`session_count`) > 0 AND s.`item_category` = 'program' ORDER BY s.`id` DESC;";
          pool.query(subscription,function(err,subscription){
            if(err) {
              console.log(err);
              res.json({
                  message:'Database_connection_error',
                  morePrograms:[],
                  total:0,
              });
          } else {
            res.json({
              message:'success',
              morePrograms:subscription,
              total:0,
            });
          }
          });
      } else {
          res.json({
            message : 'Auth_token_failure',
          });
      }
  },
    getEachProgram: (req,res,next) => {
      if(req.headers.token) {
        var query = "SELECT * FROM `programs` WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
        var images = "SELECT * FROM `images` WHERE `iv_category` = 'image' AND `item_category` = 'program' AND `item_id` = '"+ req.query.id +"'";
        var morePrograms = "SELECT p.*, (SELECT MIN(tp.`price`) AS price FROM `trainer_programs` tp WHERE tp.`program_id` = p.`id`) AS price FROM `programs` p WHERE p.`status` = 1 AND p.`imp` = 1 AND p.`id` <> '"+ req.query.id +"' AND p.`category` NOT LIKE '%Blocked%' ORDER BY RAND() DESC LIMIT 3 OFFSET 0";
        var trainers = "SELECT t.* FROM `trainer` t INNER JOIN `trainer_programs` tp ON tp.`trainer_id` = t.`id` WHERE t.`status` = 1 AND tp.`program_id` = '"+ req.query.id +"' GROUP BY tp.`trainer_id`";
        var increaseViewCount = "UPDATE `programs` SET `views` = `views` + 1 WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
        pool.query(increaseViewCount,function(err,increaseViewCount){
            pool.query(images,function(err,images){
              pool.query(morePrograms,function(err,morePrograms){
                pool.query(query,function(err,query){
                  pool.query(trainers,function(err,trainers){
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            data: [],
                            images: [],
                            morePrograms: [],
                            trainers:[]
                        });
                    } else {
                      res.json({
                        message:'success',
                        data:query,
                        images: images,
                        morePrograms: morePrograms,
                        trainers:trainers,
                      });
                    }
                  });
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
    getSearchProgram : (req,res,next) => {
      var queryData = req.query;
        if(req.headers.token) {
          var morePrograms = "SELECT p.*, (SELECT MIN(tp.`price`) AS price FROM `trainer_programs` tp WHERE tp.`program_id` = p.`id`) AS price FROM `programs` p WHERE p.`status` = 1 AND p.`imp` = 1 AND p.`title` LIKE '%"+ queryData.title +"%' AND p.`category` NOT LIKE '%Blocked%' ORDER BY p.`created_at` DESC";
          pool.query(morePrograms,function(err,morePrograms){
            if(err) {
              console.log(err);
              res.json({
                  message:'Database_connection_error',
                  topSelling: [],
                  morePrograms:[],
                  total:0,
              });
            } else {
              res.json({
                message:'success',
                topSelling:[],
                morePrograms:morePrograms,
                total: 0,
              });
            }
          });
      } else {
          res.json({
            message : 'Auth_token_failure',
          });
      }
    },
    increaseSessionCount: (req,res,next) => {
      if(req.headers.token) {
          var query = "UPDATE `subscription` SET `session_count` = `session_count` + 1 WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
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
    getTDS: (req,res,next) => {
      var trainerId = req.query.trainerId;
      if(trainerId){
        var days = "SELECT `day_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' AND `trainer_id` = '"+ trainerId +"' GROUP BY `day_id`";
        var timings = "SELECT `time_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' AND `trainer_id` = '"+ trainerId +"' GROUP BY `time_id`;";
        var sessions = "SELECT `session_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' AND `trainer_id` = '"+ trainerId +"' GROUP BY `session_id`";
      } else {
        var days = "SELECT `day_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' GROUP BY `day_id`";
        var timings = "SELECT `time_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' GROUP BY `time_id`;";
        var sessions = "SELECT `session_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' GROUP BY `session_id`";
      }
      pool.query(days,function(err,days){
        pool.query(timings,function(err,timings){
            pool.query(sessions,function(err,sessions){
                if(err) {
                  console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      days:[],
                      timings:[],
                      sessions:[]
                  });
                } else {
                  res.json({
                    message:'success',
                    days:days,
                    timings:timings,
                    sessions:sessions
                  });
                }
            });
        });
      });
    },
    checkProgramCombination: (req,res,next) => {
      var check = "SELECT `trainer_programs`.* , t.`address` FROM `trainer_programs` INNER JOIN `trainer` t ON t.`id` = `trainer_programs`.`trainer_id` WHERE `program_id` = '"+ req.query.id +"' AND `day_id` = '"+ req.query.dayId +"' AND `time_id` = '"+ req.query.timeId +"' AND `session_id` = '"+ req.query.sessionId +"' AND `trainer_id` = '"+ req.query.trainerId +"'";
      pool.query(check,function(err,check){
        if(err) {
          console.log(err);
          res.json({
              message:'Database_connection_error',
          });
        } else {
          if(check.length != 0){
            var checkSubscription = "SELECT * FROM `subscription` WHERE `item_id` = '"+ req.query.id +"' AND `item_category` = 'program' AND `user_id` = '"+ req.query.user_id +"' AND `trainer_program_id` = '"+ check[0].id +"' AND `status` = 1";
            pool.query(checkSubscription,function(err,checkSubscription){
              if(err) {
                console.log(err);
                res.json({
                    message:'Database_connection_error',
                });
              } else {
                if(checkSubscription.length != 0){
                  if((check[0].session_id - checkSubscription[0].session_count)>0) {
                    res.json({
                      message:'success',
                      present: true,
                      data:check,
                      alreadySubscribed: true
                    });
                  } else {
                    res.json({
                      message:'success',
                      present: true,
                      data:check,
                      alreadySubscribed: false
                    });
                  }
                } else {
                  res.json({
                    message:'success',
                    present: true,
                    data:check,
                    alreadySubscribed: false
                  });
                }
              }
            });
          } else {
            res.json({
              message:'success',
              present: false,
              data:check,
              alreadySubscribed: false
            });
          }
        }
      }); 
    },
    getTDSProgramCombination: (req,res,next) => {
      var trainerId = req.query.trainerId;
      var dayId = req.query.dayId;
      var sessionId = req.query.sessionId;
      var timeId = req.query.timeId;
      if(trainerId){
        var days = "SELECT `day_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' AND `trainer_id` = '"+ trainerId +"' GROUP BY `day_id`";
        var timings = "SELECT `time_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' AND `trainer_id` = '"+ trainerId +"' GROUP BY `time_id`;";
        var sessions = "SELECT `session_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' AND `trainer_id` = '"+ trainerId +"' GROUP BY `session_id`";
      } else {
        var days = "SELECT `day_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' GROUP BY `day_id`";
        var timings = "SELECT `time_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' GROUP BY `time_id`;";
        var sessions = "SELECT `session_id` FROM `trainer_programs` WHERE `program_id` = '"+ req.query.id +"' GROUP BY `session_id`";
      }
      pool.query(days,function(err,days){
        pool.query(timings,function(err,timings){
            pool.query(sessions,function(err,sessions){
                if(err) {
                  console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      days:[],
                      timings:[],
                      sessions:[],
                      present: false,
                      data:[],
                      alreadySubscribed: false
                  });
                } else {
                  var check = "SELECT `trainer_programs`.* , t.`address` FROM `trainer_programs` INNER JOIN `trainer` t ON t.`id` = `trainer_programs`.`trainer_id` WHERE `program_id` = '"+ req.query.id +"' AND `day_id` = '"+ days[0].day_id +"' AND `time_id` = '"+ timings[0].time_id +"' AND `session_id` = '"+ sessions[0].session_id +"' AND `trainer_id` = '"+ trainerId +"'";
                  pool.query(check,function(err,check){
                    if(err) {
                      res.json({
                          message:'Database_connection_error',
                          days:days,
                          timings:timings,
                          sessions:sessions,
                          present: false,
                          data:[],
                          alreadySubscribed: false
                      });
                    } else {
                      if(check.length != 0) {
                        res.json({
                          message:'success',
                          days:days,
                          timings:timings,
                          sessions:sessions,
                          present: true,
                          data:check,
                          alreadySubscribed: false
                        });
                      } else {
                        res.json({
                          message:'success',
                          days:days,
                          timings:timings,
                          sessions:sessions,
                          present: false,
                          data:check,
                          alreadySubscribed: false
                        });
                      }
                    }
                  });
                }
            });
        });
      });
    },
}