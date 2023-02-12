const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const middlewares = require('../../services/main/user');
const imageMiddlewares = require('../../services/common');
const homeMiddlewares = require('../../services/main/home');

//File upload multer
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null,'public/images/user');
  },
  filename : (req,file,callback) => {
    callback(null,Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage : fileStorageEngine,
  // limits: {fileSize: maxSize}
});


//Mail user
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : "gmail",
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: 'fitmangurugram@gmail.com',
      pass: 'yhufnlnuckhbdsxx',
    },
});

async function sendMail(email,name,phone,body,toMail) {
  var string = `Name : ${name}\n` + `Email : ${email}\n` + `Phone number : ${phone + '\nmessage: ' + body}`;
  const mailData = {
    from: 'fitmangurugram@gmail.com',  // sender address
    to: toMail,   // list of receivers
    subject: 'Contact form response',
    text: 'Contact us',
    html: string,
  };

  transporter.sendMail(mailData, function (err, info) {
      if(err){
          console.log(err);
          return false;
      }
      else {
        return true;
      }
  });
}

//Save user profile image
router.post('/saveUserOrderImage',upload.single('picture'),imageMiddlewares.saveUserImage);

/* Get User. */
router.get('/createUser', middlewares.createUser);

/* Update PhoneNumber User. */
router.post('/updatePhoneNumber', authenticationMiddleware.tokenAuthentication,middlewares.updatePhoneNumber);

/* Update User data. */
router.post('/updateData',authenticationMiddleware.tokenAuthentication, middlewares.updateData);

/* Update User data. */
router.post('/updateApperalData',authenticationMiddleware.tokenAuthentication, middlewares.updateApperalData);

/* get User data. */
router.get('/getUserProfile',authenticationMiddleware.tokenAuthentication, middlewares.getUserProfile);

/* get Initial data. */
router.get('/getInitialData', homeMiddlewares.getInitialData);

/* get Calorie data. */
router.get('/getCalorieData',authenticationMiddleware.tokenAuthentication, homeMiddlewares.getCalorieData);

/* get Food Calorie data. */
router.get('/getFoodCalorieData', authenticationMiddleware.tokenAuthentication, homeMiddlewares.getFoodCalorieData);

//Remove from food calorie  
router.post('/removeFromUserFoodCalories',authenticationMiddleware.tokenAuthentication, homeMiddlewares.removeFromUserFoodCalories);

//Search Food 
router.get('/getSearchFood',homeMiddlewares.getSearchFood);

//Search Exercise 
router.get('/getSearchExercise',homeMiddlewares.getSearchExercise);

//Add Food 
router.post('/addFood',homeMiddlewares.addFood);

//Edit Food 
router.post('/editFood',homeMiddlewares.editFood);

//Remove from workout calorie  
router.post('/removeFromUserExerciseCalories',authenticationMiddleware.tokenAuthentication,homeMiddlewares.removeFromUserExerciseCalories);

/* get Exercise Calorie data. */
router.get('/getWorkoutCalorieData', authenticationMiddleware.tokenAuthentication,homeMiddlewares.getWorkoutCalorieData);

//Add Exercise 
router.post('/addExercise',homeMiddlewares.addExercise);

//Edit Exercise 
router.post('/editExercise',homeMiddlewares.editExercise);

//Generate link
router.post('/generateShareLink',middlewares.generateShareLink);

//Send Mail
router.post('/sendMail', function (req,res,next){
  sendMail(req.body.email,req.body.name,req.body.phone,req.body.message,req.body.toMail).then((result) => {
    res.json({
      message:'success',
      result:result,
    });
  }).catch((err) => {
    res.json({
      message : 'Auth_token_failure',
    });
  });
});

/* Logout. */
router.post('/logout', authenticationMiddleware.tokenAuthentication,middlewares.logout);


module.exports = router;
