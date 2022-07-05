const pool = require('../database/connection');

module.exports ={
    //Get admin profile
    getAdminDetails: (req,res,next) => {
        const query = "SELECT * FROM `admin`";
        pool.query(query,function(err,results){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results ? results[0] : {};
            }
            next();
        });
    },
    //Update profile
    updateProfile: (req,res,next) => {
        if(req.body.c_password != req.body.password) {
            req.message = 'Please enter the same password !!';
            req.alert = 'alert-danger';
            next();
        } else {
            const query = "UPDATE `admin` SET `password` = '"+ (req.body.c_password.length != 0 ? req.body.c_password : req.body.current_password) +"', `phoneNumber` = '"+ req.body.phoneNumber +"', `share_text` = '"+ req.body.shareText +"'";
            pool.query(query,function(err,results,fields){
                if(err) {
                    req.error = 'Database error';
                    req.message = 'Some error occurred, Please try after some time!!';
                    req.alert = 'alert-danger';
                } else {
                    req.message = 'Updated Successfully !!';
                    req.alert = 'alert-success';
                }
                next();
            });
        }
    },
}