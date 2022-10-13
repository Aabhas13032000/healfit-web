const pool = require('../database/connection');

module.exports = {
    //Get user details
    getPrograms: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `programs` WHERE `status` = 1";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `programs` WHERE `status` = 1 ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `programs` WHERE `status` = 1 ORDER BY `created_at` DESC";
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
            var query = "SELECT * FROM `programs` WHERE `title` LIKE '%"+ queryData.searchText +"%' AND `category` = '"+ queryData.category +"' AND `status` = 1 ORDER BY `created_at` DESC";
        } else {
            var query = "SELECT * FROM `programs` WHERE `title` LIKE '%"+ queryData.searchText +"%' AND `status` = 1 ORDER BY `created_at` DESC";
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
    getProgramTrainers: (req,res,next) => {
        var queryData = req.query;
        var trainer_programs = "SELECT tp.* , t.`name` AS trainerName  FROM `trainer_programs` tp INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` WHERE `program_id` = '"+ queryData.program_id +"'";
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
    getTDS: (req,res,next) => {
        var trainers = "SELECT * FROM `trainer` WHERE `status` = 1";
        var days = "SELECT * FROM `days` WHERE `status` = 1";
        var timings = "SELECT * FROM `time` WHERE `status` = 1";
        var sessions = "SELECT * FROM `session` WHERE `status` = 1";
        pool.query(trainers,function(err,trainers){
            pool.query(days,function(err,days){
                pool.query(timings,function(err,timings){
                    pool.query(sessions,function(err,sessions){
                        if(err) {
                            req.error = 'Database error';
                        } else {
                            req.trainers = trainers;
                            req.days = days;
                            req.timings = timings;
                            req.sessions = sessions;
                        }
                        next();
                    });
                });
            });
        });
    },
    addCategories: (req,res,next) => {
        var categories = "INSERT INTO `program_categories` (`name`) VALUES ('"+ req.body.value +"')";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: categories,
                })
            }
        });
    },
    checkCategory: (req,res,next) => {
        var categories = "SELECT * FROM `program_categories` WHERE name = '"+ req.params.name +"' AND `status` = 1";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: categories,
                })
            }
        });
    },
    getDays: (req,res,next) => {
        var days = "SELECT * FROM `days` WHERE `status` = 1";
        pool.query(days,function(err,days){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: days,
                })
            }
        });
    },
    addDays: (req,res,next) => {
        var days = "INSERT INTO `days` (`value`) VALUES ('"+ req.body.value +"')";
        pool.query(days,function(err,days){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: days,
                })
            }
        });
    },
    getTimings: (req,res,next) => {
        var timings = "SELECT * FROM `time` WHERE `status` = 1";
        pool.query(timings,function(err,timings){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: timings,
                })
            }
        });
    },
    addTimings: (req,res,next) => {
        var timings = "INSERT INTO `time` (`value`) VALUES ('"+ req.body.value +"')";
        pool.query(timings,function(err,timings){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: timings,
                })
            }
        });
    },
    getSessions: (req,res,next) => {
        var sessions = "SELECT * FROM `session` WHERE `status` = 1";
        pool.query(sessions,function(err,sessions){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: sessions,
                })
            }
        });
    },
    addSessions: (req,res,next) => {
        var sessions = "INSERT INTO `session` (`days`) VALUES ('"+ req.body.value +"')";
        pool.query(sessions,function(err,sessions){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: sessions,
                })
            }
        });
    },
    addProgram : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "INSERT INTO `programs` (`title`,`description`,`short_desc`,`category`,`tag`,`cover_photo`,`promo_video`) VALUES ('"+ req.body.title +"','"+ req.body.description +"','"+ req.body.short_desc +"','"+ req.body.category +"','"+ req.body.tag +"','"+ images_array[0] +"','"+ req.body.promo_video +"')";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ images_array[i] +"','image','program','"+ results.insertId +"')";
                    pool.query(query,function(err,results,fields){
                        if(err) {
                            console.log(err);
                            // break;
                        } else {
                        }
                    });
                }
                res.json({
                    data: results,
                });
            }
        });
    },
    addTrainerProgram : (req,res,next) => {
        const query  = "INSERT INTO `trainer_programs` (`trainer_id`,`program_id`,`session_type`,`day_id`,`time_id`,`session_id`,`price`,`meeting_url`) VALUES ('"+ req.body.trainer_id +"','"+ req.body.program_id +"','"+ req.body.session_type +"','"+ req.body.day_id +"','"+ req.body.time_id +"','"+ req.body.session_id +"','"+ req.body.price +"','"+ req.body.meeting_url +"')";
        // console.log(query);
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({
                    data: results,
                });
            }
        });
    },
    deleteTrainerProgram : (req,res,next) => {
        const query  = "DELETE FROM `trainer_programs` WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({data:results});
            }
        });            
    },
    saveProgram : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "UPDATE `programs` SET `title` = '"+ req.body.title +"',`description` = '"+ req.body.description +"',`short_desc` = '"+ req.body.short_desc +"',`category` = '"+ req.body.category +"',`tag` = '"+ req.body.tag +"',`promo_video` = '"+ req.body.promo_video +"' WHERE `id` =  '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({
                    data: results,
                });
            }
        });
    },
    saveTrainerProgram : (req,res,next) => {
        const query  = "UPDATE `trainer_programs` SET `trainer_id` = '"+ req.body.trainer_id +"',`program_id` = '"+ req.body.program_id +"',`session_type` = '"+ req.body.session_type +"',`day_id` = '"+ req.body.day_id +"',`time_id` = '"+ req.body.time_id +"',`session_id` = '"+ req.body.session_id +"',`price` = '"+ req.body.price +"',`meeting_url` = '"+ req.body.meeting_url +"' WHERE `id` =  '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({
                    data: results,
                });
            }
        });
    },
    saveCoverImage : (req,res,next) => {
        const query  = "UPDATE `programs` SET `cover_photo` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({
                    data: results,
                });
            }
        });
    },
    deleteProgram : (req,res,next) => {
        const query  = "UPDATE `programs` SET `status` = 0  WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({data:results});
            }
        });            
    },
    markedProgamImportant : (req,res,next) => {
        const query  = "SELECT * FROM `programs` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `programs` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `programs` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    includeAddress : (req,res,next) => {
        const query  = "SELECT * FROM `programs` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].include_address == 1){
                    var query2  = "UPDATE `programs` SET `include_address` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `programs` SET `include_address` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
}