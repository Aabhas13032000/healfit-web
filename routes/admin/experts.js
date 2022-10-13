const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const trainerMiddlewares = require('../../services/trainer');

/* Trainer */

//Main Page 
router.get('/',trainerMiddlewares.getTrainer,render.getTrainersPage);
//Search Trainer 
router.get('/getSearchTrainer',trainerMiddlewares.getSearchTrainer,render.getTrainersPage);
//Add Trainer 
router.post('/addTrainer',trainerMiddlewares.addTrainer);
//save Each Trainer 
router.post('/saveTrainer',trainerMiddlewares.saveTrainer);
//save Each Trainer Profile Image
router.post('/saveTrainerProfileImage',trainerMiddlewares.saveProfileImage);
//Block Unblock trainer
router.post('/markedUserTrainer',trainerMiddlewares.markedtrainerblocked);
//Mark Trainer Important
router.post('/markedTrainerImportant',trainerMiddlewares.markedTrainerImportant);
//Delete trainer
router.post('/deleteTrainer',trainerMiddlewares.deleteTrainer);

module.exports = router;