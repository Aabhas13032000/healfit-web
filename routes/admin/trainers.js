const express = require('express');
const router = express.Router();

//JSON WEB TOKEN
const { verify } = require('jsonwebtoken');
const accessTokenSecret = 'yourtraineraccesstokensecret';

//JSON files
const sidebar = require('../../public/jsons/trainer_sidebar.json');

//Constants
const constants = require('../../controllers/constants');

//Renders
const render = require('../../controllers/admin')

//Middlewares
const trainersMiddlewares = require('../../services/trainers');

/* Books */

//Main Page
router.get('/', function(req, res, next) {
    if(constants.isDevelopment) {
      req.session.trainerToken = constants.trainerdevlopmentToken;
      req.session.user_id = 3;
    }
    if(req.session.trainerToken){
      verify(req.session.trainerToken,accessTokenSecret,(err,decoded) => {
        if(err) {
          console.log(err);
          res.render('error');
        } else {
          res.render('admin/trainer_index',{
              sidebar:sidebar,
              name: decoded.name,
              phoneNumber: decoded.phoneNumber,
              image_path: decoded.image_path,
          });
        }
      });
    } else {
      if(req.query.error){
        res.render('admin/login/trainer_login',{
          message: req.query.error,
          message_class:'alert-danger'
        });
      } else {
        res.render('admin/login/trainer_login',{
          message:'You are logged out, Please Login again!!',
          message_class:'alert-warning'
        });
      }
    }
});

/* Logout */
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      res.redirect('/admin/trainers');
    })
});
  
/*Login */
router.post('/login',trainersMiddlewares.login);
  
/* Programs */

//Main Page 
router.get('/programs',trainersMiddlewares.getPrograms,trainersMiddlewares.getCategories,render.getTrainersProgramsPage);
//Search Program 
router.get('/searchProgrm',trainersMiddlewares.getSearchProgram,trainersMiddlewares.getCategories,render.getTrainersProgramsPage);
//Get program trainers
router.get('/getProgramTrainers',trainersMiddlewares.getProgramTrainers);

/* Subscripton */

//Main Page 
router.get('/subscriptions',trainersMiddlewares.getSubscription,trainersMiddlewares.getTDS,render.getTrainerSubscriptionsPage);
//Search Program 
router.get('/getSearchSubscriptions',trainersMiddlewares.getSearchSubscription,trainersMiddlewares.getTDS,render.getTrainerSubscriptionsPage);

/* Trainer Profile */

//Main Page
router.get('/profile',trainersMiddlewares.getAdminDetails,render.getTrainerProfilePage);
// Update Password. 
router.post('/updateProfile', trainersMiddlewares.updateProfile,trainersMiddlewares.getAdminDetails,render.getTrainerProfilePage);


module.exports = router;