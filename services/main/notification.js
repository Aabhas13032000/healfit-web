const pool = require('../../database/connection');

module.exports = {
    //Get user details
    getUserNotifications: (req,res,next) => {
        if(req.headers.token) {
            var user_id = req.query.user_id;
            var offset = req.query.offset;
            var query = "SELECT * FROM `notifications` WHERE `user_id` = '"+ user_id +"' ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            var total = "SELECT COUNT(*) AS total FROM `notifications` WHERE `user_id` = '"+ user_id +"'";
            pool.query(query,function(err,query){
                pool.query(total,function(err,total){
                    if(err) {
                      console.log(err);
                        res.json({
                            message:'Database_connection_error',
                            data: [],
                            total:0
                        });
                    } else {
                      res.json({
                        message:'success',
                        data:query,
                        total: total.length != 0 ? total[0].total : 0,
                      });
                    }
                });
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    removeEachNotification : (req,res,next) => {
        if(req.headers.token) {
            var query  = "DELETE FROM `notifications` WHERE `id` = '"+ req.body.id +"'";
            console.log(query);
            pool.query(query,function(err,results,fields){
                if(err) {
                  console.log(err);
                    res.json({message:'Database_connection_error'});
                } else {
                    res.json({message: 'success'});
                }
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
}