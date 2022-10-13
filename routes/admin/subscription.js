const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const subscriptionMiddlewares = require('../../services/subscription');

/* Subscription */

//Main program Page 
router.get('/',subscriptionMiddlewares.getSubscription,subscriptionMiddlewares.getTDS,render.getSubscriptionsPage);

//Main book Page 
router.get('/book',subscriptionMiddlewares.getBookSubscription,render.getSubscriptionsPage);

//search Page 
router.get('/getSearchSubscriptions',subscriptionMiddlewares.getSearchSubscription,subscriptionMiddlewares.getTDS,render.getSubscriptionsPage);

//search book Page 
router.get('/getSearchBookSubscription',subscriptionMiddlewares.getSearchBookSubscription,render.getSubscriptionsPage);

//Add subscription 
router.post('/addSubscription',subscriptionMiddlewares.addSubscription);

//Save subscription 
router.post('/saveSubscription',subscriptionMiddlewares.saveSubscription);

//Add Book subscription 
router.post('/addBookSubscription',subscriptionMiddlewares.addBookSubscription);

//delete Each subscription 
router.post('/deleteSubscription',subscriptionMiddlewares.deleteSubscription);

module.exports = router;