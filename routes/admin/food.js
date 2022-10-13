const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const foodMiddlewares = require('../../services/food');

/* Food */

//Main Page
router.get('/',foodMiddlewares.getFood,render.getFoodPage);
//Search Food 
router.get('/getSearchFood',foodMiddlewares.getSearchFood,render.getFoodPage);
//Add Food 
router.post('/addFood',foodMiddlewares.addFood);
//save Each Food 
router.post('/saveFood',foodMiddlewares.saveFood);
//save Each Food Cover Image
router.post('/saveFoodCoverImage',foodMiddlewares.saveCoverImage);
//Delete Food
router.post('/deleteFood',foodMiddlewares.deleteFood);


module.exports = router;