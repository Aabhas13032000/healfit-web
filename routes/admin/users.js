const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const usersMiddlewares = require('../../services/users');

/* Users */

//Main Page 
router.get('/',usersMiddlewares.getUsers,render.getUsersPage);
//Get user data 
router.get('/getUserData',usersMiddlewares.getUserData);
//Each User 
router.get('/getEachUser',usersMiddlewares.getEachUser,render.getEachUserPage);
//Search User 
router.get('/getSearchUser',usersMiddlewares.getSearchUser,render.getUsersPage);
//Block Unblock user
router.post('/markedUserBlocked',usersMiddlewares.markeduserblocked);

module.exports = router;