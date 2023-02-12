const pool = require('../database/connection');

//JSON WEB TOKEN
const { sign } = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

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
            const query = "UPDATE `admin` SET `password` = '"+ (req.body.c_password.length != 0 ? req.body.c_password : req.body.current_password) +"', `phoneNumber` = '"+ req.body.phoneNumber +"', `share_text` = '"+ req.body.shareText +"', `maximum_value` = '"+ req.body.maximum_value +"', `shipping_charges` = '"+ req.body.shipping_charges +"'";
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
    getImages : (req,res,next) => {
        var queryData = req.query;
        var query  = "SELECT * FROM `images` WHERE `item_id` = '"+ queryData.item_id +"' AND `item_category` = '"+ queryData.item_category +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({data:results});
            }
        });
    },
    login : async (req, res, next) => {
        const check_user = "SELECT * FROM `admin` WHERE `email` = '"+ req.body.email +"' AND `password` = '"+ req.body.password +"' AND `status` = 1";
        pool.query(check_user,function(err,result){
          if(err) {
            console.log(err);
          } else {
            if(result.length !=0){
              const jsontoken = sign({
                username : req.body.email, 
                password:req.body.password,
                user_id: result[0].id,
                name : result[0].name,
                phoneNumber: result[0].phoneNumber,
                image_path: result[0].profile_image,
              },accessTokenSecret);
              req.session.token = jsontoken;
              res.redirect('/admin');
            } else {
              res.redirect('/admin?error=Invalid username and password !!');
            }
          }
        });
    }
}