const pool = require('../database/connection');

module.exports = {
    //Get user details
    getExercise: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `exercise` WHERE `status` = 1";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `exercise` WHERE `status` = 1 ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `exercise` WHERE `status` = 1 ORDER BY `id` DESC";
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
    getSearchExercise : (req,res,next) => {
        var queryData = req.query;
        var query = "SELECT * FROM `exercise` WHERE `name` LIKE '%"+ queryData.searchedTitle +"%' AND `status` = 1 ORDER BY `id` DESC";
        pool.query(query,function(err,results,fields){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results;
                req.totalUsers = 0;
                req.offset = 0;
                req.page = 0;
                req.searchPage = true;
                req.searchValue = queryData.searchedTitle;
            }
            next();
        });
    },
    addExercise : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "INSERT INTO `exercise` (`name`,`description`,`cover_photo`,`cat`,`calories`,`set`,`perset`,`weight`) VALUES ('"+ req.body.name +"','"+ req.body.description +"','"+ images_array[0] +"','"+ req.body.cat +"','"+ req.body.calories +"','"+ req.body.set +"','"+ req.body.perset +"','"+ req.body.weight +"')";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ images_array[i] +"','image','exercise','"+ results.insertId +"')";
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
    saveExercise : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "UPDATE `exercise` SET `name` = '"+ req.body.name +"',`description` = '"+ req.body.description +"',`cat` = '"+ req.body.cat +"',`calories` = '"+ req.body.calories +"',`set` = '"+ req.body.set +"',`perset` = '"+ req.body.perset +"',`weight` = '"+ req.body.weight +"' WHERE `id` =  '"+ req.body.id +"'";
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
        const query  = "UPDATE `exercise` SET `cover_photo` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
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
    deleteExercise : (req,res,next) => {
        const query  = "UPDATE `exercise` SET `status` = 0  WHERE `id` = '"+ req.body.id +"'";
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