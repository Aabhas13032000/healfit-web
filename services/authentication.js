const pool = require('../database/connection');

module.exports = {
    //Authenticate token
    tokenAuthentication: (req,res,next) => {
        console.log('Token Authentication');
        if(req.headers.token) {
            const user = "SELECT * FROM `user_devices` ud WHERE ud.`device_id` = '"+ req.headers.token +"' AND ud.`device` = '"+ req.headers.platform +"'";
            pool.query(user,function(err,user){
                if(err) {
                    res.json({
                        message : 'Auth_token_failure',
                    });
                } else {
                    if(user.length != 0) {
                        next();
                    } else {
                        res.json({
                            message : 'Auth_token_failure',
                        });
                    }
                }
            });
        } else {
            res.json({
                message : 'Auth_token_failure',
            });
        }
    }
}