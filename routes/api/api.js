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
  req.send('hello');
});

module.exports = router;
