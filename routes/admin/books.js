const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const booksMiddlewares = require('../../services/books');

/* Books */

//Main Page
router.get('/',booksMiddlewares.getBooks,render.getBookPage);
//Search Book 
router.get('/getSearchBooks',booksMiddlewares.getSearchBooks,render.getBookPage);
//Add Book 
router.post('/addBook',booksMiddlewares.addBook);
//save Each Book 
router.post('/saveBook',booksMiddlewares.saveBook);
//save Each Book Cover Image
router.post('/saveBookCoverImage',booksMiddlewares.saveCoverImage);
//Mark Book Important
router.post('/markedBookImportant',booksMiddlewares.markedBookImportant);
//Delete Book
router.post('/deleteBook',booksMiddlewares.deleteBook);


module.exports = router;