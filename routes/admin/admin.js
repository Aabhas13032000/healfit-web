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

//File upload multer
const multer = require('multer');
const sharp = require("sharp");
const fs =  require('fs');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null,'public/images/uploads');
  },
  filename : (req,file,callback) => {
    callback(null,Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage : fileStorageEngine,
  // limits: {fileSize: maxSize}
});


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
    res.redirect('/admin/');
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

/* Image upload functions */

// Upload CKeditor Images
router.post('/upload',upload.single('upload'),async function(req, res, next) {
  var html = '';
  var compressedimage = path.join(__dirname,'../../','public/images/uploads',new Date().getTime() + ".webp");
  var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
  await sharp(req.file.path).webp({
    quality: 50
  }).resize({
      width: 600
    }).toFile(compressedimage,(err,info) => {
      if(err){
        console.log(err);
      }
      fs.unlink(req.file.path,(err) => {
        if(err) {
          console.log(err);
        } else {
          html = "";
          html += "<script type='text/javascript'>";
          html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
          html += "    var url     = \"/images/uploads/" + compressedimage.split('/')[compressedimage.split('/').length - 1] + "\";";
          html += "    var message = \"Uploaded file successfully\";";
          html += "";
          html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
          html += "</script>";

          res.send(html);
        }
      });
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
//Each User 
router.get('/getEachUser',usersMiddlewares.getEachUser,render.getEachUserPage);
//Search User 
router.get('/getSearchUser',usersMiddlewares.getSearchUser,render.getUsersPage);
//Block Unblocl user
router.post('/markedUserBlocked',usersMiddlewares.markeduserblocked);

/* Programs */

//Main Page 
router.get('/programs',programsMiddlewares.getPrograms,render.getProgramsPage);
//Add Each Progran 
router.get('/addProgram',programsMiddlewares.getPrograms,render.getProgramsPage);


module.exports = router;
