const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const exerciseMiddlewares = require('../../services/workout');

/* Workout */

//Main Page
router.get('/',exerciseMiddlewares.getExercise,render.getWorkoutPage);
//Search Food 
router.get('/getSearchExercise',exerciseMiddlewares.getSearchExercise,render.getWorkoutPage);
//Add Food 
router.post('/addExercise',exerciseMiddlewares.addExercise);
//save Each Food 
router.post('/saveExercise',exerciseMiddlewares.saveExercise);
//save Each Food Cover Image
router.post('/saveExerciseCoverImage',exerciseMiddlewares.saveCoverImage);
//Delete Food
router.post('/deleteExercise',exerciseMiddlewares.deleteExercise);

module.exports = router;