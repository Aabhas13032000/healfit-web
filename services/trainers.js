const pool = require('../database/connection');
//JSON WEB TOKEN
const { sign } = require('jsonwebtoken');
const accessTokenSecret = 'yourtraineraccesstokensecret';


module.exports = {
    //Get admin profile
    getAdminDetails: (req,res,next) => {
        const query = "SELECT * FROM `trainer` WHERE `id` = '"+ req.session.user_id +"'";
        pool.query(query,function(err,results){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results ? results[0] : {};
            }
            next();
        });
    },
    //Update profile
    updateProfile: (req,res,next) => {
        if(req.body.c_password != req.body.password) {
            req.message = 'Please enter the same password !!';
            req.alert = 'alert-danger';
            next();
        } else {
            const query = "UPDATE `trainer` SET `password` = '"+ (req.body.c_password.length != 0 ? req.body.c_password : req.body.current_password) +"', `phoneNumber` = '"+ req.body.phoneNumber +"' WHERE `id` = '"+ req.session.user_id +"'";
            pool.query(query,function(err,results,fields){
                if(err) {
                    req.error = 'Database error';
                    req.message = 'Some error occurred, Please try after some time!!';
                    req.alert = 'alert-danger';
                } else {
                    req.message = 'Updated Successfully !!';
                    req.alert = 'alert-success';
                }
                next();
            });
        }
    },
    //Login
    login : async (req, res, next) => {
        const check_user = "SELECT * FROM `trainer` WHERE `email` = '"+ req.body.email +"' AND `password` = '"+ req.body.password +"' AND `status` = 1";
        pool.query(check_user,function(err,result){
          if(err) {
            console.log(err);
          } else {
            if(result.length !=0){
              const jsontoken = sign({
                username : req.body.email, 
                password:req.body.password,
                user_id: result[0].id,
                name : result[0].name,
                phoneNumber: result[0].phoneNumber,
                image_path: result[0].profile_image,
              },accessTokenSecret);
              req.session.user_id = result[0].id;
              req.session.trainerToken = jsontoken;
              res.redirect('/admin/trainers');
            } else {
              res.redirect('/admin/trainers?error=Invalid username and password !!');
            }
          }
        });
    },
    //Get user details
    getPrograms: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT p.`id` FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`status` = 1 AND tp.`trainer_id` = '"+ req.session.user_id +"' GROUP BY p.`id`";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT p.* FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`status` = 1 AND tp.`trainer_id` = '"+ req.session.user_id +"' GROUP BY p.`id` ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT p.* FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`status` = 1 AND tp.`trainer_id` = '"+ req.session.user_id +"' GROUP BY p.`id` ORDER BY `created_at` DESC";
            req.offset = 0;
            req.page = 0;
        }
        pool.query(query,function(err,results){
            pool.query(totalUsers,function(err,totalUsers){
                if(err) {
                    req.error = 'Database error';
                } else {
                    req.data = results;
                    req.totalUsers = totalUsers.length;
                    req.searchPage = false;
                    req.searchValue = '';
                    req.statusValue = '';
                }
                next();
            });
        });
    },
    getSearchProgram : (req,res,next) => {
        var queryData = req.query;
        if(queryData.category.length != 0){
            var query = "SELECT p.* FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`title` LIKE '%"+ queryData.searchText +"%' AND p.`category` = '"+ queryData.category +"' AND p.`status` = 1 AND tp.`trainer_id` = '"+ req.session.user_id +"' GROUP BY p.`id` ORDER BY `created_at` DESC";
        } else {
            var query = "SELECT p.* FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`title` LIKE '%"+ queryData.searchText +"%' AND p.`status` = 1 AND tp.`trainer_id` = '"+ req.session.user_id +"' GROUP BY p.`id` ORDER BY `created_at` DESC";
        }
        pool.query(query,function(err,results,fields){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results;
                req.totalUsers = 0;
                req.offset = 0;
                req.page = 0;
                req.searchPage = true;
                req.searchValue = queryData.searchText;
                req.statusValue = queryData.category;
            }
            next();
        });
    },
    getProgramTrainers: (req,res,next) => {
        var queryData = req.query;
        var trainer_programs = "SELECT tp.* , t.`name` AS trainerName  FROM `trainer_programs` tp INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE tp.`program_id` = '"+ queryData.program_id +"' AND tp.`trainer_id` = '"+ req.session.user_id +"'";
        pool.query(trainer_programs,function(err,trainer_programs){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: trainer_programs,
                })
            }
        });
    },
    getCategories: (req,res,next) => {
        var categories = "SELECT * FROM `program_categories` WHERE `status` = 1";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                req.categories = categories;
            }
            next();
        });
    },
    getSubscription: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `subscription` WHERE `item_category` = 'program'";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT s.*,t.`name` AS trainerName,p.`title` AS programName,tp.`price`,tp.`day_id`,tp.`session_id`,tp.`time_id`,tp.`session_type`,u.`name` AS userName,u.`phoneNumber` AS phoneNumber,tp.`meeting_url` FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'program' AND tp.`trainer_id` = '"+ req.session.user_id +"' ORDER BY s.`date_purchased` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT s.*,t.`name` AS trainerName,p.`title` AS programName,tp.`price`,tp.`day_id`,tp.`session_id`,tp.`time_id`,tp.`session_type`,u.`name` AS userName,u.`phoneNumber` AS phoneNumber,tp.`meeting_url` FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'program' AND tp.`trainer_id` = '"+ req.session.user_id +"' ORDER BY s.`date_purchased` DESC";
            req.offset = 0;
            req.page = 0;
        }
        pool.query(query,function(err,results){
            pool.query(totalUsers,function(err,totalUsers){
                if(err) {
                    req.error = 'Database error';
                } else {
                    req.data = results;
                    req.totalUsers = totalUsers.length > 0 ? totalUsers[0].total : 0;
                    req.searchPage = false;
                    req.bookPage = false;
                    req.dateFrom = '';
                    req.dateTo = '';
                    req.phoneNumber = '';
                    req.trainer = '';
                    req.program = '';
                    req.book = '';
                    req.userName = '';
                    req.sessionType = '';
                    req.sessionId = '';
                    req.dayId = '';
                    req.timingId = '';
                    req.books = [];
                    req.trainer_programs = [];
                }
                next();
            });
        });
    },
    getSearchSubscription : (req,res,next) => {
        var queryData = req.query;
        var dateFrom = queryData.dateFrom ? queryData.dateFrom : '';
        var dateTo = queryData.dateTo ? queryData.dateTo : '';
        var phoneNumber = queryData.phoneNumber ? queryData.phoneNumber : '';
        var trainer = queryData.trainer ? queryData.trainer : '';
        var program = queryData.program ? queryData.program : '';
        var userName = queryData.userName ? queryData.userName : '';
        var sessionType = queryData.sessionType ? queryData.sessionType : '';
        var sessionId = queryData.sessionId ? queryData.sessionId : '';
        var dayId = queryData.dayId ? queryData.dayId : '';
        var timingId = queryData.timingId ? queryData.timingId : '';
        const query = "SELECT s.*,t.`name` AS trainerName,p.`title` AS programName,tp.`price`,tp.`day_id`,tp.`session_id`,tp.`time_id`,tp.`session_type`,u.`name` AS userName,u.`phoneNumber` AS phoneNumber,tp.`meeting_url` FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'program'" + (phoneNumber.length != 0 ? ' AND u.`phoneNumber` LIKE "%'+ phoneNumber +'%"' : '') + (userName.length != 0 ? ' AND u.`name` LIKE "%'+ userName +'%"' : '') + (trainer.length != 0 ? ' AND t.`name` = "'+ trainer +'"' : '') + (program.length != 0 ? ' AND p.`title` = "'+ program +'"' : '') + (sessionType.length != 0 ? ' AND tp.`session_type` = "'+ sessionType +'"' : '') + (sessionId.length != 0 ? ' AND tp.`session_id` = "'+ sessionId +'"' : '') + (dayId.length != 0 ? ' AND tp.`day_id` = "'+ dayId +'"' : '') + (timingId.length != 0 ? ' AND tp.`time_id` = "'+ timingId +'"' : '') + ( (dateFrom.length != 0 && dateTo.length == 0) ? ' AND s.`date_purchased` LIKE "%'+ dateFrom +'%"' : '') + ( (dateFrom.length == 0 && dateTo.length != 0) ? ' AND s.`date_purchased` LIKE "%'+ dateTo +'%"' : '') + ( (dateFrom.length != 0 && dateTo.length != 0) ? ' AND s.`date_purchased` BETWEEN "'+ dateFrom +'" AND "'+ dateTo +'"' : '') + " ORDER BY s.`date_purchased` DESC";
        // console.log(query);
        pool.query(query,function(err,results,fields){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results;
                req.totalUsers = 0;
                req.offset = 0;
                req.page = 0;
                req.searchPage = true;
                req.bookPage = false;
                req.dateFrom = dateFrom;
                req.dateTo = dateTo;
                req.phoneNumber = phoneNumber;
                req.trainer = trainer;
                req.program = program;
                req.book = '';
                req.userName = userName;
                req.sessionType = sessionType;
                req.sessionId = sessionId;
                req.dayId = dayId;
                req.timingId = timingId;
                req.books = [];
            }
            next();
        });
    },
    getTDS: (req,res,next) => {
        var trainers = "SELECT * FROM `trainer` WHERE `status` = 1";
        var days = "SELECT * FROM `days` WHERE `status` = 1";
        var timings = "SELECT * FROM `time` WHERE `status` = 1";
        var sessions = "SELECT * FROM `session` WHERE `status` = 1";
        var programs = "SELECT `title` FROM `programs` WHERE `status` = 1";
        var trainer_programs = "SELECT tp.* , t.`name` AS trainerName , p.`title` AS programName  FROM `trainer_programs` tp INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `programs` p ON p.`id` = tp.`program_id`";
        pool.query(trainers,function(err,trainers){
            pool.query(days,function(err,days){
                pool.query(timings,function(err,timings){
                    pool.query(sessions,function(err,sessions){
                        pool.query(programs,function(err,programs){
                            pool.query(trainer_programs,function(err,trainer_programs){
                                if(err) {
                                    req.error = 'Database error';
                                } else {
                                    req.trainers = trainers;
                                    req.days = days;
                                    req.timings = timings;
                                    req.sessions = sessions;
                                    req.programs = programs;
                                    req.trainer_programs = trainer_programs;
                                    req.loginTrainerId = req.session.user_id;
                                }
                                next();
                            });
                        });
                    });
                });
            });
        });
    },
}