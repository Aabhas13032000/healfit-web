const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const ordersMiddlewares = require('../../services/orders');

/* Orders */

//Main Page
router.get('/',ordersMiddlewares.getOrders,ordersMiddlewares.getProducts,render.getOrdersPage);

//search order Page
router.get('/getSearchOrders',ordersMiddlewares.getSearchOrders,ordersMiddlewares.getProducts,render.getOrdersPage);

//Block Unblock user
router.post('/changeOrderStatus',ordersMiddlewares.changeOrderStatus);

//Add order
router.post('/addOrder',ordersMiddlewares.addOrder);

//Delete order
router.post('/deleteOrder',ordersMiddlewares.deleteOrder);

module.exports = router;