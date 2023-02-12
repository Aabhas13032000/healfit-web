const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const productsMiddlewares = require('../../services/products');

/* products */

//Main Page
router.get('/',productsMiddlewares.getProducts,productsMiddlewares.getCategories,render.getProductPage);
//Get Product Size Quantity
router.get('/getProductSizesQuantity',productsMiddlewares.getProductSizesQuantity);
//Add product category
router.post('/addCategories',productsMiddlewares.addCategories);
//Check product category name
router.get('/checkProductCategory/:name',productsMiddlewares.checkCategory);
//update product category image
router.post('/updateProductCategoryImage',productsMiddlewares.updateProductCategoryImage);
//delete product category image
router.post('/deleteProductCategoryImage',productsMiddlewares.deleteProductCategoryImage);
//Add cloth category
router.post('/addClothCategories',productsMiddlewares.addClothCategories);
//Check cloth category name
router.get('/checkClothCategory/:name',productsMiddlewares.checkClothCategory);
//update product category image
router.post('/updateClothCategoryImage',productsMiddlewares.updateClothCategoryImage);
//delete product category image
router.post('/deleteClothCategoryImage',productsMiddlewares.deleteClothCategoryImage);
//Search product 
router.get('/getSearchProducts',productsMiddlewares.getSearchProducts,productsMiddlewares.getCategories,render.getProductPage);
//Add product 
router.post('/addProduct',productsMiddlewares.addProduct);
//save Each product 
router.post('/saveProduct',productsMiddlewares.saveProduct);
//save Each product Cover Image
router.post('/saveProductCoverImage',productsMiddlewares.saveCoverImage);
//save Each product Cover Image
router.post('/saveClothCategoryCoverPhoto/:id',productsMiddlewares.saveClothCategoryCoverPhoto);
//delete Each product Cover Image
router.post('/deleteClothCategoryCoverPhoto',productsMiddlewares.deleteClothCategoryCoverPhoto);
//Mark product Important
router.post('/markedProductImportant',productsMiddlewares.markedProductImportant);
//Mark product category Important
router.post('/markedProductCategoryImportant',productsMiddlewares.markedProductCategoryImportant);
//Mark product category home Important
router.post('/markedProductCategoryHomeImportant',productsMiddlewares.markedProductCategoryHomeImportant);
//Mark product category Nav Important
router.post('/markedProductCategoryNavImportant',productsMiddlewares.markedProductCategoryNavImportant);
//Mark cloth category Important
router.post('/markedClothCategoryImportant',productsMiddlewares.markedClothCategoryImportant);
//Mark cloth category home Important
router.post('/markedClothCategoryHomeImportant',productsMiddlewares.markedClothCategoryHomeImportant);
//Block Unblock user
router.post('/markedProductblocked',productsMiddlewares.markedProductblocked);
//Delete product
router.post('/deleteProduct',productsMiddlewares.deleteProduct);


module.exports = router;