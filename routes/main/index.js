const express = require('express');
const router = express.Router();
// const { sign,verify } = require('jsonwebtoken');
// const accessTokenSecret = 'youraccesstokensecret';
// const multer = require('multer');
// const sharp = require("sharp");
// const fs =  require('fs');
// const pool = require('../database/connection');
// var gplay = require('google-play-scraper');
// const Razorpay = require('razorpay');
// const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  // req.session.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiJSb2hhbkAwMDciLCJ1c2VyX2lkIjoxLCJpYXQiOjE2Mzk4MjExNzl9.f0UWbPBaLSaaKBxPaxcNOQCqVhTVEdQM9S65r7FI2eo';
  if(req.session.token){
    verify(req.session.token,accessTokenSecret,(err,decoded) => {
      console.log(err);
      console.log(decoded);
      res.render('index');
    });
  } else {
    if(req.query.error){
      res.render('components/login/login',{
        message: req.query.error,
        message_class:'alert-danger'
      });
    } else {
      res.render('components/login/login',{
        message:'You are logged out, Please Login again!!',
        message_class:'alert-warning'
      });
    }
  }
});


module.exports = router;
