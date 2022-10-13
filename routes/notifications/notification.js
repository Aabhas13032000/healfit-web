const express = require('express');
const router = express.Router();

//Middlewares
const notificationMiddlewares = require('../../services/main/notification');

//Get Notifications
router.get('/',notificationMiddlewares.getUserNotifications);

//Remove Notification
router.post('/removeEachNotification',notificationMiddlewares.removeEachNotification);

module.exports = router;
