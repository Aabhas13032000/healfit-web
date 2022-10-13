const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const cartMiddlewares = require('../../services/main/cart');

//User Cart
router.get('/getUserCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.getUserCart);

//add To Cart
router.post('/addToCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.addToCart);

//Remove from cart 
router.post('/removeFromCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.removeFromCart);

module.exports = router;
