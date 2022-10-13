const pool = require('../../database/connection');

module.exports = {
      getInitialData: (req,res,next) => {
        var user_id = req.query.user_id;
        if(req.headers.token) {
            var date = req.query.date;
            var myPrograms = "SELECT c.`id`,tp.*,p.`title`,p.`cover_photo`, t.`name` AS trainerName FROM `subscription` c INNER JOIN `trainer_programs` tp ON tp.`id` = c.`trainer_program_id` INNER JOIN `programs` p ON p.`id` = c.`item_id` JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE c.`user_id` = '"+ user_id +"' ORDER BY c.`end_date` DESC";
            var user_calories = "SELECT * FROM `user_calories` WHERE `created_at` LIKE '%"+ date +"%' AND `user_id` = '"+ user_id +"'";
            var user_exercise = "SELECT * FROM `user_exercise` WHERE `created_at` LIKE '%"+ date +"%' AND `user_id` = '"+ user_id +"'";
            var exclusivePrograms = "SELECT p.*, (SELECT MIN(tp.`price`) AS price FROM `trainer_programs` tp WHERE tp.`program_id` = p.`id`) AS price FROM `programs` p WHERE p.`status` = 1 AND p.`imp` = 1 AND p.`category` LIKE '%Exclusive for user%' ORDER BY p.`created_at` DESC";
            var spotlightPrograms = "SELECT * FROM `programs` WHERE `status` = 1 AND `imp` = 1 AND `category` LIKE '%Spotlight%' ORDER BY `created_at` DESC";
            var ourBooks = "SELECT * FROM `books` WHERE `status` = 1 AND `imp` = 1 ORDER BY `created_at` DESC LIMIT 4 OFFSET 0";
            var popular = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`imp` = 1 ORDER BY b.`id` DESC";
            var testimonials = "SELECT * FROM `testimonials` WHERE `status` = 1 AND `imp` =  1 ORDER BY `created_at` DESC";
            var experts = "SELECT * FROM `trainer` WHERE `status` = 1 AND `imp` = 1 ORDER BY `created_at` DESC";
            // console.log(spotlightPrograms);
            pool.query(myPrograms,function(err,myPrograms){
                pool.query(user_calories,function(err,user_calories){
                    pool.query(user_exercise,function(err,user_exercise){
                        pool.query(exclusivePrograms,function(err,exclusivePrograms){
                            pool.query(spotlightPrograms,function(err,spotlightPrograms){
                                pool.query(ourBooks,function(err,ourBooks){
                                    pool.query(popular,function(err,popular){
                                        pool.query(testimonials,function(err,testimonials){
                                            pool.query(experts,function(err,experts){
                                                if(err) {
                                                    console.log(err);
                                                    res.json({
                                                        message:'Database_connection_error',
                                                        myPrograms:[],
                                                        user_calories:[],
                                                        user_exercise:[],
                                                        exclusivePrograms:[],
                                                        ourBooks:[],
                                                        popular:[],
                                                        testimonials:[],
                                                        experts:[],
                                                        spotlightPrograms:[],
                                                        today:date,
                                                    });
                                                } else {
                                                  res.json({
                                                      message:'success',
                                                      myPrograms:myPrograms,
                                                      user_calories:user_calories,
                                                      user_exercise:user_exercise,
                                                      exclusivePrograms:exclusivePrograms,
                                                      ourBooks:ourBooks,
                                                      popular:popular,
                                                      testimonials:testimonials,
                                                      experts:experts,
                                                      spotlightPrograms:spotlightPrograms,
                                                      today:date,
                                                  });
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
          } else {
            var date = new Date();
            var exclusivePrograms = "SELECT p.*, (SELECT MIN(tp.`price`) AS price FROM `trainer_programs` tp WHERE tp.`program_id` = p.`id`) AS price FROM `programs` p WHERE p.`status` = 1 AND p.`imp` = 1 AND p.`category` LIKE '%Exclusive for user%' ORDER BY p.`created_at` DESC LIMIT 4 OFFSET 0";
            var spotlightPrograms = "SELECT * FROM `programs` WHERE `status` = 1 AND `imp` = 1 AND `category` LIKE '%Spotlight%' ORDER BY `created_at` DESC";
            var ourBooks = "SELECT * FROM `books` WHERE `status` = 1 AND `imp` = 1 ORDER BY `created_at` DESC LIMIT 4 OFFSET 0";
            var popular = "SELECT b.* , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE') AS totalLikes , (SELECT COUNT(*) FROM `like_comment` lk WHERE lk.`item_id` = b.`id` AND lk.`item_category` = 'blog' AND lk.`category` = 'LIKE' AND lk.`user_id` = '"+ req.query.user_id+"') AS isLiked FROM `blog` b WHERE b.`status` = 1 AND b.`imp` = 1 ORDER BY b.`id` DESC";
            var testimonials = "SELECT * FROM `testimonials` WHERE `status` = 1 AND `imp` =  1 ORDER BY `created_at` DESC";
            var experts = "SELECT * FROM `trainer` WHERE `status` = 1 AND `imp` = 1 ORDER BY `created_at` DESC";
            pool.query(exclusivePrograms,function(err,exclusivePrograms){
                pool.query(spotlightPrograms,function(err,spotlightPrograms){
                    pool.query(ourBooks,function(err,ourBooks){
                        pool.query(popular,function(err,popular){
                            pool.query(testimonials,function(err,testimonials){
                                pool.query(experts,function(err,experts){
                                    if(err) {
                                        console.log(err);
                                        res.json({
                                            message:'Database_connection_error',
                                            myPrograms:[],
                                            user_calories:[],
                                            user_exercise:[],
                                            exclusivePrograms:[],
                                            ourBooks:[],
                                            popular:[],
                                            testimonials:[],
                                            experts:[],
                                            spotlightPrograms:[],
                                            today:date
                                        });
                                    } else {
                                      res.json({
                                          message:'success_without_token',
                                          myPrograms:[],
                                          user_calories:[],
                                          user_exercise:[],
                                          exclusivePrograms:exclusivePrograms,
                                          ourBooks:ourBooks,
                                          popular:popular,
                                          testimonials:testimonials,
                                          experts:experts,
                                          spotlightPrograms:spotlightPrograms,
                                          today:date
                                      });
                                    }
                                });
                            });
                        });
                    });
                });
            });
          }
      },
      getCalorieData: (req,res,next) => {
        var user_id = req.query.user_id;
        var date = req.query.date;
        if(req.headers.token) {
            var user_calories = "SELECT * FROM `user_calories` WHERE `created_at` LIKE '%"+ date +"%' AND `user_id` = '"+ user_id +"'";
            var user_exercise = "SELECT * FROM `user_exercise` WHERE `created_at` LIKE '%"+ date +"%' AND `user_id` = '"+ user_id +"'";
            pool.query(user_calories,function(err,user_calories){
                pool.query(user_exercise,function(err,user_exercise){
                    if(err) {
                        console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            user_calories:[],
                            user_exercise:[],
                        });
                    } else {
                      res.json({
                          message:'success',
                          user_calories:user_calories,
                          user_exercise:user_exercise,
                      });
                    }
                });
            });
          } else {
            res.json({
                message : 'Auth_token_failure',
              });
          }
      },
      getFoodCalorieData: (req,res,next) => {
        var user_id = req.query.user_id;
        var date = req.query.date;
        if(req.headers.token) {
            var user_calories = "SELECT uc.*, f.`name`, f.`description`,f.`cover_photo`,f.`units` AS food_unit,f.`quantity` AS food_quantity,f.`calories` AS food_calories,f.`protein`,f.`fats`,f.`carbs`,f.`fiber` FROM `user_calories` uc INNER JOIN `food` f ON f.`id` = uc.`food_id` WHERE uc.`created_at` LIKE '%"+ date +"%' AND uc.`user_id` = '"+ user_id +"' AND f.`status` = 1 ORDER BY uc.`created_at` DESC";
            pool.query(user_calories,function(err,user_calories){
                if(err) {
                    console.log(err);
                    res.json({
                        message:'Database_connection_error',
                        user_calories:[],
                    });
                } else {
                  res.json({
                      message:'success',
                      user_calories:user_calories,
                  });
                }
            });
          } else {
            res.json({
                message : 'Auth_token_failure',
              });
          }
      },
      getWorkoutCalorieData: (req,res,next) => {
        var user_id = req.query.user_id;
        var date = req.query.date;
        if(req.headers.token) {
            var user_exercise = "SELECT ue.*, e.`name`, e.`description`,e.`cover_photo`,e.`cat`,e.`set` AS exercise_set,e.`perset` AS exercise_perset,e.`calories` AS exercise_calories FROM `user_exercise` ue INNER JOIN `exercise` e ON e.`id` = ue.`exercise_id` WHERE ue.`created_at` LIKE '%"+ date +"%' AND ue.`user_id` = '"+ user_id +"' AND e.`status` = 1 ORDER BY ue.`created_at` DESC";
            pool.query(user_exercise,function(err,user_exercise){
                if(err) {
                    console.log(err);
                    res.json({
                        message:'Database_connection_error',
                        user_exercise:[],
                    });
                } else {
                  res.json({
                      message:'success',
                      user_exercise:user_exercise,
                  });
                }
            });
          } else {
            res.json({
                message : 'Auth_token_failure',
              });
          }
      },
      removeFromUserFoodCalories : (req,res,next) => {
        if(req.headers.token) {
            var query  = "DELETE FROM `user_calories` WHERE `id` = '"+ req.body.id +"'";
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
    removeFromUserExerciseCalories : (req,res,next) => {
      if(req.headers.token) {
          var query  = "DELETE FROM `user_exercise` WHERE `id` = '"+ req.body.id +"'";
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
  getSearchFood : (req,res,next) => {
    var queryData = req.query;
    var string = '';
    var array = queryData.searchedTitle.toString().split(' ');
    for(var i=0;i<array.length;i++) {
        if(i < (array.length -1)) {
            string = string + `\`name\` LIKE '%${array[i]}%' OR `;
        } else {
            string = string + `\`name\` LIKE '%${array[i]}%'`;
        }
    }
    var firstQuery = "SELECT * FROM `food` WHERE `name` LIKE '%"+ queryData.searchedTitle +"%' AND `status` = 1 ORDER BY `name`";
    var query = "SELECT * FROM `food` WHERE "+ string +" AND `status` = 1 ORDER BY `name`";
    pool.query(firstQuery,function(err,results,fields){
        if(err) {
            console.log(err);
            res.json({message:'Database_connection_error'});
        } else {
            if(results.length != 0) {
                res.json({
                    message: 'success',
                    data:results
                });
            } else {
                pool.query(query,function(err,result,fields){
                    if(err) {
                        console.log(err);
                        res.json({message:'Database_connection_error'});
                    } else {
                        res.json({
                            message: 'success',
                            data:result
                        });
                    }
                });
            }
        }
    });
  },
  getSearchExercise : (req,res,next) => {
    var queryData = req.query;
    var string = '';
    var array = queryData.searchedTitle.toString().split(' ');
    for(var i=0;i<array.length;i++) {
        if(i < (array.length -1)) {
            string = string + `\`name\` LIKE '%${array[i]}%' OR `;
        } else {
            string = string + `\`name\` LIKE '%${array[i]}%'`;
        }
    }
    var firstQuery = "SELECT * FROM `exercise` WHERE `name` LIKE '%"+ queryData.searchedTitle +"%' OR `cat` LIKE '%"+ queryData.searchedTitle +"%' AND `status` = 1 ORDER BY `name`";
    var query = "SELECT * FROM `exercise` WHERE "+ string +" OR `cat` LIKE '%"+ queryData.searchedTitle +"%' AND `status` = 1 ORDER BY `name`";
    pool.query(firstQuery,function(err,results,fields){
        if(err) {
            console.log(err);
            res.json({message:'Database_connection_error'});
        } else {
            if(results.length != 0) {
                res.json({
                    message: 'success',
                    data:results
                });
            } else {
                pool.query(query,function(err,result,fields){
                    if(err) {
                        console.log(err);
                        res.json({message:'Database_connection_error'});
                    } else {
                        res.json({
                            message: 'success',
                            data:result
                        });
                    }
                });
            }
        }
    });
  },
  addFood : (req,res,next) => {
      const query  = "INSERT INTO `user_calories` (`user_id`,`food_id`,`meal`,`unit`,`servings`,`calories`,`created_at`) VALUES ('"+ req.body.user_id +"','"+ req.body.food_id +"','"+ req.body.meal +"','"+ req.body.unit +"','"+ req.body.servings +"','"+ req.body.calories +"','"+ req.body.date +"')";
      // console.log(query);
      pool.query(query,function(err,results,fields){
          if(err) {
            console.log(err);
              res.json({message:'Database_connection_error'});
          } else {
            res.json({
                message: 'success',
            });
          }
      });
  },
  editFood : (req,res,next) => {
      const query  = "UPDATE `user_calories` SET `meal` = '"+ req.body.meal +"',`unit` = '"+ req.body.unit +"',`servings` = '"+ req.body.servings +"',`calories` = '"+ req.body.calories +"' WHERE `id` = '"+ req.body.id +"'";
      // console.log(query);
      pool.query(query,function(err,results,fields){
          if(err) {
            console.log(err);
              res.json({message:'Database_connection_error'});
          } else {
            res.json({
                message: 'success',
            });
          }
      });
  },
  addExercise : (req,res,next) => {
      const query  = "INSERT INTO `user_exercise` (`user_id`,`exercise_id`,`set`,`perset`,`weight`,`calories`,`min`,`created_at`) VALUES ('"+ req.body.user_id +"','"+ req.body.exercise_id +"','"+ req.body.set +"','"+ req.body.perset +"','"+ req.body.weight +"','"+ req.body.calories +"','"+ req.body.min +"','"+ req.body.date +"')";
      // console.log(query);
      pool.query(query,function(err,results,fields){
          if(err) {
            console.log(err);
              res.json({message:'Database_connection_error'});
          } else {
            res.json({
                message: 'success',
            });
          }
      });
  },
  editExercise : (req,res,next) => {
      const query  = "UPDATE `user_exercise` SET `set` = '"+ req.body.set +"',`perset` = '"+ req.body.perset +"',`weight` = '"+ req.body.weight +"',`calories` = '"+ req.body.calories +"',`min` = '"+ req.body.min +"' WHERE `id` = '"+ req.body.id +"'";
      // console.log(query);
      pool.query(query,function(err,results,fields){
          if(err) {
            console.log(err);
              res.json({message:'Database_connection_error'});
          } else {
            res.json({
                message: 'success',
            });
          }
      });
  },
}