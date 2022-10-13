const express = require('express');
const router = express.Router();

//Authentication
const authenticationMiddleware = require('../../services/authentication');
//Middlewares
const blogsMiddlewares = require('../../services/main/blogs');

//Main Page
router.get('/',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.getBlogs);

//Search Blog 
router.get('/getSearchBlogs',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.getSearchedBlogs);

//Each Blog 
router.get('/getEachBlog',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.getEachBlog);

//Get Each Blog Comments
router.get('/getEachBlogComments',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.getEachBlogComments);

//Like Each Blog 
router.post('/likeEachBlog',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.likeEachBlog);

//Comment Each Blog 
router.post('/commentEachBlog',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.commentEachBlog);

//Dislike Each Blog 
router.post('/deleteLikeComment',authenticationMiddleware.tokenAuthentication,blogsMiddlewares.deleteLikeComment);

module.exports = router;
