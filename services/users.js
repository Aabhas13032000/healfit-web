const pool = require('../database/connection');

module.exports = {
    //Get user details
    getUsers: (req,res,next) => {
        var queryData = req.query;
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * , (SELECT COUNT(*) FROM `users` WHERE `phoneNumber` <> '+910000000000') AS total FROM `users` WHERE `phoneNumber` <> '+910000000000' ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * , (SELECT COUNT(*) FROM `users` WHERE `phoneNumber` <> '+910000000000') AS total FROM `users` WHERE `phoneNumber` <> '+910000000000' ORDER BY `created_at` DESC";
            req.offset = 0;
            req.page = 0;
        }
        pool.query(query,function(err,results){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results;
            }
            next();
        });
    }
}