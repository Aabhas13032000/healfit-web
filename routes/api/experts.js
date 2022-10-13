const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const expertMiddlewares = require('../../services/main/experts');

//Main Page
router.get('/',authenticationMiddleware.tokenAuthentication,expertMiddlewares.getTrainer);

//Search trainer 
router.get('/getSearchTrainers',expertMiddlewares.getSearchTrainer);

//Each trainer 
router.get('/getEachTrainers',authenticationMiddleware.tokenAuthentication,expertMiddlewares.getEachTrainer);

module.exports = router;
