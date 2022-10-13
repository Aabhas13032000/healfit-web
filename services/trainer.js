const pool = require('../database/connection');

module.exports = {
    //Get user details
    getTrainer: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `trainer` WHERE `status` = 1";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `trainer` ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `trainer` ORDER BY `created_at` DESC";
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
    getSearchTrainer : (req,res,next) => {
        var queryData = req.query;
        if(queryData.statusCategory.length != 0){
            var query = "SELECT * FROM `trainer` WHERE `name` LIKE '%"+ queryData.name +"%' AND `status` = "+ queryData.statusCategory +" ORDER BY `created_at` DESC";
        } else {
            var query = "SELECT * FROM `trainer` WHERE `name` LIKE '%"+ queryData.name +"%' ORDER BY `created_at` DESC";
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
                req.searchValue = queryData.name;
                req.statusValue = queryData.statusCategory;
            }
            next();
        });
    },
    addTrainer : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "INSERT INTO `trainer` (`name`,`about`,`vision`,`qualification`,`expertise`,`profile_image`,`phoneNumber`,`email`,`password`,`address`) VALUES ('"+ req.body.name +"','"+ req.body.about +"','"+ req.body.vision +"','"+ req.body.qualification +"','"+ req.body.expertise +"','"+ images_array[0] +"','"+ req.body.phoneNumber +"','"+ req.body.email +"','"+ req.body.password +"','"+ req.body.address +"')";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ images_array[i] +"','image','trainer','"+ results.insertId +"')";
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
    saveTrainer : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "UPDATE `trainer` SET `name` = '"+ req.body.name +"',`about` = '"+ req.body.about +"',`vision` = '"+ req.body.vision +"',`qualification` = '"+ req.body.qualification +"',`expertise` = '"+ req.body.expertise +"',`phoneNumber` = '"+ req.body.phoneNumber +"',`email` = '"+ req.body.email +"',`password` = '"+ req.body.password +"',`address` = '"+ req.body.address +"' WHERE `id` =  '"+ req.body.id +"'";
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
    saveProfileImage : (req,res,next) => {
        const query  = "UPDATE `trainer` SET `profile_image` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
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
    markedtrainerblocked : (req,res,next) => {
        const query  = "SELECT * FROM `trainer` WHERE `id` = '"+ req.body.id +"' AND (`status` = 1 OR `status` = 2)";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].status == 'BLOCKED'){
                    var query2  = "UPDATE `trainer` SET `status` = 1  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `trainer` SET `status` = 2  WHERE `id` = '"+ req.body.id +"'";
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
    markedTrainerImportant : (req,res,next) => {
        const query  = "SELECT * FROM `trainer` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `trainer` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `trainer` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
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
    deleteTrainer : (req,res,next) => {
        const query  = "UPDATE `trainer` SET `status` = 3  WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({data:results});
            }
        });            
    },
}