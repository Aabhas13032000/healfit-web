const express = require('express');
const router = express.Router();

//Constants
const constants = require('../../controllers/constants');
//Middlewares
const curectMiddlewares = require('../../services/apparels/main');

/* GET home page. */
router.get('/', curectMiddlewares.getClothCategory,curectMiddlewares.getCountryCodes ,function(req, res, next) {
  res.render('main/main',{
    page: 'Home',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    categories_array:[],
    product_categories: req.productCategories,
    country_codes:req.country_codes,
  });
  // res.render('main/maintinance');
});

/* GET Food Calorie page. */
router.get('/food_calories',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/food_calories',{
    page: 'Food Calories',
    firebaseKey: constants.firebaseWebApiKey,
    date:req.query.date,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
  // res.render('main/maintinance');
});

/* GET Workout Calorie page. */
router.get('/workout_calories',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/workout_calories',{
    page: 'Workout Calories',
    firebaseKey: constants.firebaseWebApiKey,
    date:req.query.date,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
  // res.render('main/maintinance');
});

/* GET about page. */
router.get('/about',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/about_us',{
    page: 'About',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET about-mobile page. */
router.get('/about-mobile', function(req, res, next) {
  res.render('main/about_mobile',{
    page: 'About',
    isDevelopment: constants.isDevelopment,
    country_codes:[],
  });
});

/* GET blog page. */
router.get('/blogs',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/blogs',{
    page: 'Blogs',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET each blog page. */
router.get('/each-blog/:id',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/each-blog',{
    page: 'Blog',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET Contact us page. */
router.get('/contact',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/contact_us',{
    page: 'Contact',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET Contact us page. */
router.get('/contact-mobile', function(req, res, next) {
  res.render('main/contact_mobile',{
    page: 'Contact',
    isDevelopment: constants.isDevelopment,
    country_codes:[],
  });
});

/* GET Expert page. */
router.get('/experts',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/experts',{
    page: 'Experts',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET Expert profile page. */
router.get('/expert-profile/:id',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/each-expert',{
    page: 'Expert',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET Programs page. */
router.get('/programs',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/programs',{
    page: 'Programs',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET purchased Programs page. */
router.get('/myPrograms',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/my_programs',{
    page: 'My Programs',
    message:req.query.message ? req.query.message : "",
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET User cart. */
router.get('/cart',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/cart',{
    page: 'Cart',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET book page. */
router.get('/books',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/books',{
    page: 'Books',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET purchased books page. */
router.get('/purchasedBooks',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/purchased_books',{
    page: 'Purchased Books',
    message:req.query.message ? req.query.message : "",
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET each program page. */
router.get('/each-program/:id',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/each-program',{
    page: 'Program',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET privacy policy page. */
router.get('/privacy-policy',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/privacy_policy',{
    page: 'Privacy Policy',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET terms and condition page. */
router.get('/terms-conditions',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/terms_and_condition',{
    page: 'Terms & Conditions',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

/* GET  page. */
router.get('/refund-policy',curectMiddlewares.getCountryCodes, function(req, res, next) {
  res.render('main/refund_policy',{
    page: 'Refund policy',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    country_codes:req.country_codes,
  });
});

module.exports = router;