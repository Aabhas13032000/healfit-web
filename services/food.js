const pool = require('../database/connection');

module.exports = {
    //Get user details
    getFood: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `food` WHERE `status` = 1";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `food` WHERE `status` = 1 ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `food` WHERE `status` = 1 ORDER BY `id` DESC";
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
    getSearchFood : (req,res,next) => {
        var queryData = req.query;
        var query = "SELECT * FROM `food` WHERE `name` LIKE '%"+ queryData.searchedTitle +"%' AND `status` = 1 ORDER BY `id` DESC";
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
    addFood : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "INSERT INTO `food` (`name`,`description`,`cover_photo`,`units`,`quantity`,`calories`,`protein`,`fats`,`carbs`,`fiber`) VALUES ('"+ req.body.name +"','"+ req.body.description +"','"+ images_array[0] +"','"+ req.body.units +"','"+ req.body.quantity +"','"+ req.body.calories +"','"+ req.body.protein +"','"+ req.body.fats +"','"+ req.body.carbs +"','"+ req.body.fiber +"')";
        // console.log(query);
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ images_array[i] +"','image','food','"+ results.insertId +"')";
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
    saveFood : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "UPDATE `food` SET `name` = '"+ req.body.name +"',`description` = '"+ req.body.description +"',`units` = '"+ req.body.units +"',`quantity` = '"+ req.body.quantity +"',`calories` = '"+ req.body.calories +"',`protein` = '"+ req.body.protein +"',`fats` = '"+ req.body.fats +"',`carbs` = '"+ req.body.carbs +"',`fiber` = '"+ req.body.fiber +"' WHERE `id` =  '"+ req.body.id +"'";
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
        const query  = "UPDATE `food` SET `cover_photo` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
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
    deleteFood : (req,res,next) => {
        const query  = "UPDATE `food` SET `status` = 0  WHERE `id` = '"+ req.body.id +"'";
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