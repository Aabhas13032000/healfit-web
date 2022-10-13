const pool = require('../../database/connection');

module.exports = {
    //Get user details
    getTrainer: (req,res,next) => {
        if(req.headers.token) {
            var offset = req.query.offset;
            var query = "SELECT * FROM `trainer` WHERE `status` = 1 ORDER BY `created_at` DESC LIMIT 20 OFFSET "+ offset +"";
            var total = "SELECT COUNT(*) AS total FROM `trainer` WHERE `status` = 1";
            pool.query(query,function(err,query){
                pool.query(total,function(err,total){
                  if(err) {
                    console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          data: [],
                          total:0,
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
    getEachTrainer: (req,res,next) => {
        if(req.headers.token) {
            var query = "SELECT * FROM `trainer` WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
            var images = "SELECT * FROM `images` WHERE `iv_category` = 'image' AND `item_category` = 'trainer' AND `item_id` = '"+ req.query.id +"'";
            var programs = "SELECT p.* , MIN(tp.`price`) AS price FROM `programs` p INNER JOIN `trainer_programs` tp ON tp.`program_id` = p.`id` WHERE p.`status` = 1 AND tp.`trainer_id` = '"+ req.query.id +"' GROUP BY tp.`program_id`";
            pool.query(query,function(err,query){
                pool.query(images,function(err,images){
                    pool.query(programs,function(err,programs){
                        if(err) {
                          console.log(err);
                            res.json({
                                message:'Database_connection_error',
                                data: [],
                                images: [],
                                programs: []
                            });
                        } else {
                          res.json({
                            message:'success',
                            data:query,
                            images: images,
                            programs: programs
                          });
                        }
                    });
                });
            });
          } else {
            res.json({
              message : 'Auth_token_failure',
            });
          }
    },
    getSearchTrainer : (req,res,next) => {
        var queryData = req.query;
        var query = "SELECT * FROM `trainer` WHERE `name` LIKE '%"+ queryData.name +"%' AND `status` = 1 ORDER BY `created_at` DESC";
        pool.query(query,function(err,results,fields){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    data: [],
                    total:0,
                });
            } else {
              res.json({
                message:'success',
                data:results,
                total: 0,
              });
            }
        });
    },
}