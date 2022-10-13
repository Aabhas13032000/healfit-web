const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const programsMiddlewares = require('../../services/programs');

/* Programs */

//Main Page 
router.get('/',programsMiddlewares.getPrograms,programsMiddlewares.getCategories,programsMiddlewares.getTDS,render.getProgramsPage);
//Search Program 
router.get('/searchProgrm',programsMiddlewares.getSearchProgram,programsMiddlewares.getCategories,programsMiddlewares.getTDS,render.getProgramsPage);
//Add days
router.post('/addCategories',programsMiddlewares.addCategories);
//Check category name
router.get('/checkProgramCategory/:name',programsMiddlewares.checkCategory);
//Get program trainers
router.get('/getProgramTrainers',programsMiddlewares.getProgramTrainers);
//Get days
router.get('/getDays',programsMiddlewares.getDays);
//Add days
router.post('/addDays',programsMiddlewares.addDays);
//Get timings
router.get('/getTimings',programsMiddlewares.getTimings);
//Add timings
router.post('/addTimings',programsMiddlewares.addTimings);
//Get sessions
router.get('/getSessions',programsMiddlewares.getSessions);
//Add sessions
router.post('/addSessions',programsMiddlewares.addSessions);
//Add Progran 
router.post('/addProgram',programsMiddlewares.addProgram);
//save Each program 
router.post('/saveProgram',programsMiddlewares.saveProgram);
//delete Each program 
router.post('/deleteProgram',programsMiddlewares.deleteProgram);
//Add Progran trainer
router.post('/addProgramTrainer',programsMiddlewares.addTrainerProgram);
//save Each program trainer
router.post('/saveTrainerProgram',programsMiddlewares.saveTrainerProgram);
//delete Each program trainer
router.post('/deleteProgramTrainer',programsMiddlewares.deleteTrainerProgram);
//save Each Program Cover Image
router.post('/saveProgramCoverImage',programsMiddlewares.saveCoverImage);
//Mark Program Important
router.post('/markedProgramImportant',programsMiddlewares.markedProgamImportant);
//include address
router.post('/includeAddress',programsMiddlewares.includeAddress);

module.exports = router;