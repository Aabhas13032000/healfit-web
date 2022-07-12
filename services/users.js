const pool = require('../database/connection');

module.exports = {
    //Get user details
    getUsers: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `users` WHERE `phoneNumber` <> '+910000000000'";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `users` WHERE `phoneNumber` <> '+910000000000' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `users` WHERE `phoneNumber` <> '+910000000000' ORDER BY `id` DESC";
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
                }
                next();
            });
        });
    },
    getEachUser: (req,res,next) => {
        var queryData = req.query;
        var query = "SELECT * FROM `users` WHERE `id` = '"+ queryData.user_id +"'";
        var subscriptions = "SELECT * FROM `subscription` WHERE `user_id` = '"+ queryData.user_id +"'";
        pool.query(query,function(err,results){
            pool.query(subscriptions,function(err,subscriptions){
                if(err) {
                    req.error = 'Database error';
                } else {
                    req.data = results[0];
                    req.subscriptions = subscriptions;
                }
                next();
            });
        });
    },
    markeduserblocked : (req,res,next) => {
        const query  = "SELECT * FROM `users` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                if(results[0].blocked == 0){
                    var query2  = "UPDATE `users` SET `status` = 2  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `users` SET `status` = 2  WHERE `id` = '"+ req.body.id +"'";
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
    getSearchUser : (req,res,next) => {
        var queryData = req.query;
        const query = "SELECT * FROM `users` WHERE `phoneNumber` LIKE '%"+ queryData.phone_number +"%'";
        pool.query(query,function(err,results,fields){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results;
                req.totalUsers = 0;
                req.offset = 0;
                req.page = 0;
                req.searchPage = true;
                req.searchValue = queryData.phone_number;
            }
            next();
        });
    },
}