const express = require('express');
const router = express.Router();

//JSON WEB TOKEN
const { sign,verify } = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

//Database Connection
const pool = require('../../database/connection');

//JSON files
const sidebar = require('../../public/jsons/sidebar.json');

//Constants
const constants = require('../../controllers/constants');

//Renders
const render = require('../../controllers/admin')

//Middlewares
const middlewares = require('../../services/admin');
const usersMiddlewares = require('../../services/users');
const programsMiddlewares = require('../../services/programs');


/* Index. */
router.get('/', function(req, res, next) {
  if(constants.isDevelopment) {
    req.session.token = constants.devlopmentToken;
  }
  if(req.session.token){
    verify(req.session.token,accessTokenSecret,(err,decoded) => {
      if(err) {
        res.render('error');
      } else {
        res.render('admin/index',{
            sidebar:sidebar,
            name: decoded.name,
            phoneNumber: decoded.phoneNumber,
            image_path: decoded.image_path,
        });
      }
    });
  } else {
    if(req.query.error){
      res.render('admin/login/login',{
        message: req.query.error,
        message_class:'alert-danger'
      });
    } else {
      res.render('admin/login/login',{
        message:'You are logged out, Please Login again!!',
        message_class:'alert-warning'
      });
    }
  }
});

/* Logout */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/');
  })
});

/*Login */
router.post('/login', function(req, res, next) {
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
});

/* Admin Profile */

//Main Page
router.get('/profile',middlewares.getAdminDetails,render.getAdminProfilePage);
// Update Password. 
router.post('/updateProfile', middlewares.updateProfile,middlewares.getAdminDetails,render.getAdminProfilePage);

/* Users */

//Main Page 
router.get('/users',usersMiddlewares.getUsers,render.getUsersPage);

/* Programs */

//Main Page 
router.get('/programs',programsMiddlewares.getPrograms,render.getProgramsPage);
//Add Each Progran 
router.get('/addProgram',programsMiddlewares.getPrograms,render.getProgramsPage);


module.exports = router;
