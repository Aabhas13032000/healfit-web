const pool = require('../database/connection');

module.exports = {
    //Get user details
    getBlogs: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `blog` WHERE `status` = 1";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `blog` WHERE `status` = 1 ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `blog` WHERE `status` = 1 ORDER BY `id` DESC";
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
    getSearchBlogs : (req,res,next) => {
        var queryData = req.query;
        var query = "SELECT * FROM `blog` WHERE `title` LIKE '%"+ queryData.searchedTitle +"%' AND `status` = 1 ORDER BY `id` DESC";
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
    addBlog : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[2])[1] != 'string'){
            images_array = (Object.entries(req.body)[2])[1];
        } else {
            images_array.push((Object.entries(req.body)[2])[1]);
        }
        const query  = "INSERT INTO `blog` (`title`,`description`,`cover_photo`) VALUES ('"+ req.body.title +"','"+ req.body.description +"','"+ images_array[0] +"')";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ images_array[i] +"','image','blogs','"+ results.insertId +"')";
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
    saveBlog : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[2])[1] != 'string'){
            images_array = (Object.entries(req.body)[2])[1];
        } else {
            images_array.push((Object.entries(req.body)[2])[1]);
        }
        const query  = "UPDATE `blog` SET `title` = '"+ req.body.title +"',`description` = '"+ req.body.description +"' WHERE `id` =  '"+ req.body.id +"'";
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
        const query  = "UPDATE `blog` SET `cover_photo` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
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
    markedBlogImportant : (req,res,next) => {
        const query  = "SELECT * FROM `blog` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `blog` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `blog` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
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
    deleteBlog : (req,res,next) => {
        const query  = "UPDATE `blog` SET `status` = 0  WHERE `id` = '"+ req.body.id +"'";
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