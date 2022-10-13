const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const productsMiddlewares = require('../../services/books');

/* Books */

//Main Page
router.get('/',productsMiddlewares.getBooks,render.getBookPage);
//Search Book 
router.get('/getSearchBooks',productsMiddlewares.getSearchBooks,render.getBookPage);
//Add Book 
router.post('/addBook',productsMiddlewares.addBook);
//save Each Book 
router.post('/saveBook',productsMiddlewares.saveBook);
//save Each Book Cover Image
router.post('/saveBookCoverImage',productsMiddlewares.saveCoverImage);
//Mark Book Important
router.post('/markedBookImportant',productsMiddlewares.markedBookImportant);
//Delete Book
router.post('/deleteBook',productsMiddlewares.deleteBook);


module.exports = router;