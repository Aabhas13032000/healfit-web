const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const cartMiddlewares = require('../../services/main/cart');
//Address Middlewares
const addressMiddlewares = require('../../services/main/address');

//User Cart
router.get('/getUserCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.getUserCart);

//User Product Cart
router.get('/getUserProductCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.getUserProductCart);

//User Checkout Product
router.get('/getCheckoutProduct',authenticationMiddleware.tokenAuthentication,cartMiddlewares.getCheckoutProduct);

//User program PRoduct Cart
router.get('/getUserMobileCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.getUserMobileCart);

//add To Cart
router.post('/addToCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.addToCart);

//add product To Cart
router.post('/addProductToCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.addProductToCart);

//increase decrease Cart
router.post('/increaseDecreaseQuantity',authenticationMiddleware.tokenAuthentication,cartMiddlewares.increaseDecreaseQuantity);

//Remove from cart 
router.post('/removeFromCart',authenticationMiddleware.tokenAuthentication,cartMiddlewares.removeFromCart);

//get Address
router.get('/getAddress',authenticationMiddleware.tokenAuthentication,addressMiddlewares.getAddress);

//add Address
router.post('/addAddress',authenticationMiddleware.tokenAuthentication,addressMiddlewares.addAddress);

//save address 
router.post('/saveAddress',authenticationMiddleware.tokenAuthentication,addressMiddlewares.saveAddress);

//save address 
router.post('/deleteAddress',authenticationMiddleware.tokenAuthentication,addressMiddlewares.deleteAddress);

//Get Cities/States 
router.get('/getCitiesStates',authenticationMiddleware.tokenAuthentication,addressMiddlewares.getCitiesStates);

module.exports = router;
