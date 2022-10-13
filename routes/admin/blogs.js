const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const blogsMiddlewares = require('../../services/blogs');

/* Blogs */

//Main Page
router.get('/',blogsMiddlewares.getBlogs,render.getBlogPage);
//Search Blog 
router.get('/getSearchBlogs',blogsMiddlewares.getSearchBlogs,render.getBlogPage);
//Add Blog 
router.post('/addBlog',blogsMiddlewares.addBlog);
//save Each Blog 
router.post('/saveBlog',blogsMiddlewares.saveBlog);
//save Each Blog Cover Image
router.post('/saveBlogCoverImage',blogsMiddlewares.saveCoverImage);
//Mark Blog Important
router.post('/markedBlogImportant',blogsMiddlewares.markedBlogImportant);
//Delete Blog
router.post('/deleteBlog',blogsMiddlewares.deleteBlog);

module.exports = router;