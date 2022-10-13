const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const booksMiddlewares = require('../../services/main/books');

//Main Page
router.get('/',authenticationMiddleware.tokenAuthentication,booksMiddlewares.getBooks);

//Search Blog 
router.get('/getSearchBooks',authenticationMiddleware.tokenAuthentication,booksMiddlewares.getSearchedBooks);

//Get purchased books
router.get('/purchasedBooks',authenticationMiddleware.tokenAuthentication,booksMiddlewares.getPurchasedBooks);

//Each Blog 
router.get('/getEachBook',authenticationMiddleware.tokenAuthentication,booksMiddlewares.getEachBook);

//Book Subscription 
router.get('/checkBookSubscription',authenticationMiddleware.tokenAuthentication,booksMiddlewares.checkBookSubscription);

//Increase Download Value 
router.post('/increaseBookDownload',authenticationMiddleware.tokenAuthentication,booksMiddlewares.increaseBookDownload);

module.exports = router;
