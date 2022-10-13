const pool = require('../database/connection');

module.exports = {
    //Get user details
    getTestimonials: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `testimonials` WHERE `status` = 1";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `testimonials` WHERE `status` = 1 ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `testimonials` WHERE `status` = 1 ORDER BY `created_at` DESC";
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
    getSearchTestimonials : (req,res,next) => {
        var queryData = req.query;
        const query = "SELECT * FROM `testimonials` WHERE `name` LIKE '%"+ queryData.name +"%' AND `status` = 1 ORDER BY `id` DESC";
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
            }
            next();
        });
    },
    markedTestimonialImportant : (req,res,next) => {
        const query  = "SELECT * FROM `testimonials` WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `testimonials` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `testimonials` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
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
    addTestimonial : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[3])[1] != 'string'){
            images_array = (Object.entries(req.body)[3])[1];
        } else {
            images_array.push((Object.entries(req.body)[3])[1]);
        }
        const query  = "INSERT INTO `testimonials` (`name`,`message`,`tag_line`,`profile_image`) VALUES ('"+ req.body.name +"','"+ req.body.message +"','"+ req.body.tag_line +"','"+ images_array[0] +"')";
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
    saveTestimonial : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[3])[1] != 'string'){
            images_array = (Object.entries(req.body)[3])[1];
        } else {
            images_array.push((Object.entries(req.body)[3])[1]);
        }
        const query  = "UPDATE `testimonials` SET `name` = '"+ req.body.name +"',`message` = '"+ req.body.message +"',`tag_line` = '"+ req.body.tag_line +"',`profile_image` = '"+ images_array[0] +"' WHERE `id` = '"+ req.body.id +"'";
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
        const query  = "UPDATE `testimonials` SET `profile_image` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
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
    deleteTestimonial : (req,res,next) => {
        const query  = "UPDATE `testimonials` SET `status` = 0  WHERE `id` = '"+ req.body.id +"'";
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