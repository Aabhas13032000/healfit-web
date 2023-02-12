const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const productsMiddlewares = require('../../services/main/products');

/* products */

//Main Page
router.get('/getProductsInitialData',productsMiddlewares.getProductsInitialData);
//Main Page
router.get('/getProductsByGender',productsMiddlewares.getProductsByGender);
//Main Page
router.get('/getProductsByCategory',productsMiddlewares.getProductsByCategory);
//Search product 
router.get('/getSearchProductsByGender',productsMiddlewares.getSearchProductsByGender);
//Search product 
router.get('/getSearchProductsByCategory',productsMiddlewares.getSearchProductsByCategory);

//Each product 
router.get('/getEachProduct',productsMiddlewares.getEachProduct);

//Orders 
router.get('/getUserProductOrders',authenticationMiddleware.tokenAuthentication,productsMiddlewares.getUserProductOrders);

//Change Order Status
router.post('/changeOrderStatus',productsMiddlewares.changeOrderStatus);

//Search Orders 
router.get('/getSearchUserProductOrders',authenticationMiddleware.tokenAuthentication,productsMiddlewares.getSearchUserProductOrders);

module.exports = router;