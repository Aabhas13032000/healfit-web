const pool = require('../database/connection');

module.exports = {
    //Get user details
    getSubscription: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `subscription` WHERE `item_category` = 'program'";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT s.*,t.`name` AS trainerName,p.`title` AS programName,tp.`price`,tp.`day_id`,tp.`session_id`,tp.`time_id`,tp.`session_type`,u.`name` AS userName,u.`phoneNumber` AS phoneNumber FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'program' ORDER BY s.`date_purchased` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT s.*,t.`name` AS trainerName,p.`title` AS programName,tp.`price`,tp.`day_id`,tp.`session_id`,tp.`time_id`,tp.`session_type`,u.`name` AS userName,u.`phoneNumber` AS phoneNumber FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'program' ORDER BY s.`date_purchased` DESC";
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
    getBookSubscription: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `subscription` WHERE `item_category` = 'book'";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT s.*,b.`title`,b.`discount_price` AS price,u.`name` AS userName,u.`phoneNumber` AS phoneNumber FROM `subscription` s INNER JOIN `books` b ON b.`id` = s.`item_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'book' ORDER BY s.`date_purchased` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT s.*,b.`title`,b.`discount_price` AS price,u.`name` AS userName,u.`phoneNumber` AS phoneNumber FROM `subscription` s INNER JOIN `books` b ON b.`id` = s.`item_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'book' ORDER BY s.`date_purchased` DESC";
            req.offset = 0;
            req.page = 0;
        }
        var books = "SELECT `id`,`title` FROM `books` WHERE `status` = 1";
        // console.log(query);
        pool.query(query,function(err,results){
            pool.query(totalUsers,function(err,totalUsers){
                pool.query(books,function(err,books){
                    if(err) {
                        console.log(err);
                        req.error = 'Database error';
                    } else {
                        req.data = results;
                        req.totalUsers = totalUsers.length > 0 ? totalUsers[0].total : 0;
                        req.searchPage = false;
                        req.bookPage = true;
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
                        req.trainers = [];
                        req.days = [];
                        req.timings = [];
                        req.sessions = [];
                        req.programs = [];
                        req.books = books;
                        req.trainer_programs = [];
                    }
                    next();
                });
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
        const query = "SELECT s.*,t.`name` AS trainerName,p.`title` AS programName,tp.`price`,tp.`day_id`,tp.`session_id`,tp.`time_id`,tp.`session_type`,u.`name` AS userName,u.`phoneNumber` AS phoneNumber FROM `subscription` s INNER JOIN `programs` p ON p.`id` = s.`item_id` INNER JOIN `trainer_programs` tp ON tp.`id` = s.`trainer_program_id` INNER JOIN `trainer` t ON t.`id` = tp.`trainer_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'program'" + (phoneNumber.length != 0 ? ' AND u.`phoneNumber` LIKE "%'+ phoneNumber +'%"' : '') + (userName.length != 0 ? ' AND u.`name` LIKE "%'+ userName +'%"' : '') + (trainer.length != 0 ? ' AND t.`name` = "'+ trainer +'"' : '') + (program.length != 0 ? ' AND p.`title` = "'+ program +'"' : '') + (sessionType.length != 0 ? ' AND tp.`session_type` = "'+ sessionType +'"' : '') + (sessionId.length != 0 ? ' AND tp.`session_id` = "'+ sessionId +'"' : '') + (dayId.length != 0 ? ' AND tp.`day_id` = "'+ dayId +'"' : '') + (timingId.length != 0 ? ' AND tp.`time_id` = "'+ timingId +'"' : '') + ( (dateFrom.length != 0 && dateTo.length == 0) ? ' AND s.`date_purchased` LIKE "%'+ dateFrom +'%"' : '') + ( (dateFrom.length == 0 && dateTo.length != 0) ? ' AND s.`date_purchased` LIKE "%'+ dateTo +'%"' : '') + ( (dateFrom.length != 0 && dateTo.length != 0) ? ' AND s.`date_purchased` BETWEEN "'+ dateFrom +'" AND "'+ dateTo +'"' : '') + " ORDER BY s.`date_purchased` DESC";
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
    getSearchBookSubscription : (req,res,next) => {
        var queryData = req.query;
        var dateFrom = queryData.dateFrom ? queryData.dateFrom : '';
        var dateTo = queryData.dateTo ? queryData.dateTo : '';
        var phoneNumber = queryData.phoneNumber ? queryData.phoneNumber : '';
        var book = queryData.book ? queryData.book : '';
        var userName = queryData.userName ? queryData.userName : '';
        const query = "SELECT s.*,b.`title`,b.`discount_price` AS price,u.`name` AS userName,u.`phoneNumber` AS phoneNumber FROM `subscription` s INNER JOIN `books` b ON b.`id` = s.`item_id` INNER JOIN `users` u ON u.`id` = s.`user_id` WHERE s.`status` = 1 AND s.`item_category` = 'book'" + (phoneNumber.length != 0 ? ' AND u.`phoneNumber` LIKE "%'+ phoneNumber +'%"' : '') + (userName.length != 0 ? ' AND u.`name` LIKE "%'+ userName +'%"' : '') + (book.length != 0 ? ' AND b.`title` = "'+ book +'"' : '') + ( (dateFrom.length != 0 && dateTo.length == 0) ? ' AND s.`date_purchased` LIKE "%'+ dateFrom +'%"' : '') + ( (dateFrom.length == 0 && dateTo.length != 0) ? ' AND s.`date_purchased` LIKE "%'+ dateTo +'%"' : '') + ( (dateFrom.length != 0 && dateTo.length != 0) ? ' AND s.`date_purchased` BETWEEN "'+ dateFrom +'" AND "'+ dateTo +'"' : '') + " ORDER BY s.`date_purchased` DESC";
        var books = "SELECT `id`,`title` FROM `books` WHERE `status` = 1";
        // console.log(query);
        pool.query(query,function(err,results,fields){
            pool.query(books,function(err,books,fields){
                if(err) {
                    console.log(err);
                    req.error = 'Database error';
                } else {
                    req.data = results;
                    req.totalUsers = 0;
                    req.offset = 0;
                    req.page = 0;
                    req.searchPage = true;
                    req.bookPage = true;
                    req.dateFrom = dateFrom;
                    req.dateTo = dateTo;
                    req.phoneNumber = phoneNumber;
                    req.trainer = '';
                    req.program = '';
                    req.book = book;
                    req.userName = userName;
                    req.sessionType = '';
                    req.sessionId = '';
                    req.dayId = '';
                    req.timingId = '';
                    req.books = books;
                    req.trainer_programs = [];
                }
                next();
            });
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
                                }
                                next();
                            });
                        });
                    });
                });
            });
        });
    },
    deleteSubscription : (req,res,next) => {
        const query  = "UPDATE `subscription` SET `status` = 0  WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({message:'success'});
            }
        });            
    },
    addSubscription : (req,res,next) => {
        const query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`trainer_program_id`,`end_date`,`session_count`,`user_id`) VALUES ('"+ req.body.item_id +"','"+ req.body.item_category +"','"+ req.body.trainer_program_id +"','"+ req.body.end_date +"',0,'"+ req.body.user_id +"')";
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
    saveSubscription : (req,res,next) => {
        const query  = "UPDATE `subscription` SET `end_date` = '"+ req.body.end_date +"',`session_count` = '"+ req.body.session_count +"',`pdf_path` = '"+ req.body.pdf_path +"' WHERE id = '"+ req.body.id +"'";
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
    addBookSubscription : (req,res,next) => {
        const query  = "INSERT INTO `subscription` (`item_id`,`item_category`,`end_date`,`user_id`) VALUES ('"+ req.body.item_id +"','"+ req.body.item_category +"','"+ req.body.end_date +"','"+ req.body.user_id +"')";
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
}