const express = require('express');
const router = express.Router();

//Constants
const constants = require('../../controllers/constants');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/main',{
    page: 'Home',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
  // res.render('main/maintinance');
});

/* GET Food Calorie page. */
router.get('/food_calories', function(req, res, next) {
  res.render('main/food_calories',{
    page: 'Food Calories',
    firebaseKey: constants.firebaseWebApiKey,
    date:req.query.date,
    isDevelopment: constants.isDevelopment,
  });
  // res.render('main/maintinance');
});

/* GET Workout Calorie page. */
router.get('/workout_calories', function(req, res, next) {
  res.render('main/workout_calories',{
    page: 'Workout Calories',
    firebaseKey: constants.firebaseWebApiKey,
    date:req.query.date,
    isDevelopment: constants.isDevelopment,
  });
  // res.render('main/maintinance');
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('main/about_us',{
    page: 'About',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET about-mobile page. */
router.get('/about-mobile', function(req, res, next) {
  res.render('main/about_mobile',{
    page: 'About',
    isDevelopment: constants.isDevelopment,
  });
});

/* GET blog page. */
router.get('/blogs', function(req, res, next) {
  res.render('main/blogs',{
    page: 'Blogs',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET each blog page. */
router.get('/each-blog/:id', function(req, res, next) {
  res.render('main/each-blog',{
    page: 'Blog',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET Contact us page. */
router.get('/contact', function(req, res, next) {
  res.render('main/contact_us',{
    page: 'Contact',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET Contact us page. */
router.get('/contact-mobile', function(req, res, next) {
  res.render('main/contact_mobile',{
    page: 'Contact',
    isDevelopment: constants.isDevelopment,
  });
});

/* GET Expert page. */
router.get('/experts', function(req, res, next) {
  res.render('main/experts',{
    page: 'Experts',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET Expert profile page. */
router.get('/expert-profile/:id', function(req, res, next) {
  res.render('main/each-expert',{
    page: 'Expert',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET Programs page. */
router.get('/programs', function(req, res, next) {
  res.render('main/programs',{
    page: 'Programs',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET purchased Programs page. */
router.get('/myPrograms', function(req, res, next) {
  res.render('main/my_programs',{
    page: 'My Programs',
    message:req.query.message ? req.query.message : "",
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET User cart. */
router.get('/cart', function(req, res, next) {
  res.render('main/cart',{
    page: 'Cart',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET book page. */
router.get('/books', function(req, res, next) {
  res.render('main/books',{
    page: 'Books',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET purchased books page. */
router.get('/purchasedBooks', function(req, res, next) {
  res.render('main/purchased_books',{
    page: 'Purchased Books',
    message:req.query.message ? req.query.message : "",
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET each program page. */
router.get('/each-program/:id', function(req, res, next) {
  res.render('main/each-program',{
    page: 'Program',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET privacy policy page. */
router.get('/privacy-policy', function(req, res, next) {
  res.render('main/privacy_policy',{
    page: 'Privacy Policy',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET terms and condition page. */
router.get('/terms-conditions', function(req, res, next) {
  res.render('main/terms_and_condition',{
    page: 'Terms & Conditions',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

/* GET  page. */
router.get('/refund-policy', function(req, res, next) {
  res.render('main/refund_policy',{
    page: 'Refund policy',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
  });
});

module.exports = router;