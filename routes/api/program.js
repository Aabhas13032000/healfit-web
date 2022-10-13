const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const programsMiddlewares = require('../../services/main/programs');

//Main Page
router.get('/',authenticationMiddleware.tokenAuthentication,programsMiddlewares.getPrograms);

//Search Program 
router.get('/getSearchPrograms',authenticationMiddleware.tokenAuthentication,programsMiddlewares.getSearchProgram);

//Each Program 
router.get('/getEachPrograms',authenticationMiddleware.tokenAuthentication,programsMiddlewares.getEachProgram);

//Each Program 
router.get('/getUserPrograms',authenticationMiddleware.tokenAuthentication,programsMiddlewares.getUserPrograms);

//Get Time session days and combination
// router.get('/getTDSProgramCombination',programsMiddlewares.getTDSProgramCombination);

//Get Time session days 
router.get('/getTDS',programsMiddlewares.getTDS);

//Get Program combination
router.get('/checkProgramCombination',programsMiddlewares.checkProgramCombination);

//Increase Session Count Value 
router.post('/increaseSessionCount',authenticationMiddleware.tokenAuthentication,programsMiddlewares.increaseSessionCount);

module.exports = router;
