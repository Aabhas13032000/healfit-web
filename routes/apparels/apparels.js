const apparelsExpress = require('express');
const apparelsRouter = apparelsExpress.Router();

//Constants
const constants = require('../../controllers/constants');
//Middlewares
const curectMiddlewares = require('../../services/apparels/main');

//curl -X GET -H "Host: mail.example.com" localhost:3000

/* GET home page. */
apparelsRouter.get('/', curectMiddlewares.getClothCategory ,function(req, res, next) {
  if(req.query.clothCategories) {
    res.render('apparels/clothCategory',{
      page: 'curect',
      firebaseKey: constants.firebaseWebApiKey,
      isDevelopment: constants.isDevelopment,
      baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
      category:req.query.clothCategories ? req.query.clothCategories : '',
      mainUrl:constants.curectUrl,
      categories_array: req.clothCategories,
      product_categories: req.productCategories,
    });
  } else {
    if(req.query.category) {
      res.render('apparels/category',{
          page: 'curect',
          firebaseKey: constants.firebaseWebApiKey,
          isDevelopment: constants.isDevelopment,
          baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
          category:req.query.category ? req.query.category : '',
          mainUrl:constants.curectUrl,
          categories_array: req.clothCategories,
          product_categories: req.productCategories,
      });
    } else {
      if(req.query.gender) {
        res.render('apparels/main',{
            page: 'curect',
            firebaseKey: constants.firebaseWebApiKey,
            isDevelopment: constants.isDevelopment,
            baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
            gender:req.query.gender ? req.query.gender : '',
            mainUrl:constants.curectUrl,
            categories_array: req.clothCategories,
            product_categories: req.productCategories,
        });
      } else {
        res.render('apparels/home',{
            page: 'curect',
            firebaseKey: constants.firebaseWebApiKey,
            isDevelopment: constants.isDevelopment,
            baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
            gender:req.query.gender ? req.query.gender : '',
            mainUrl:constants.curectUrl,
            categories_array:[],
            product_categories: req.productCategories,
        });
      }
    }
  }
});

/* GET Contact us page. */
apparelsRouter.get('/contact', curectMiddlewares.getClothCategory, function(req, res, next) {
    res.render('apparels/contact_us',{
      page: 'Contact',
      firebaseKey: constants.firebaseWebApiKey,
      isDevelopment: constants.isDevelopment,
      baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
      mainUrl:constants.curectUrl,
      categories_array: req.clothCategories,
      product_categories: req.productCategories,
    });
  });

/* GET each Product page. */
apparelsRouter.get('/each-product/:id', curectMiddlewares.getClothCategory, function(req, res, next) {
    res.render('apparels/each-product',{
      page: 'Product',
      firebaseKey: constants.firebaseWebApiKey,
      id:req.params.id,
      isDevelopment: constants.isDevelopment,
      baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
      mainUrl:constants.curectUrl,
      categories_array: req.clothCategories,
      product_categories: req.productCategories,
    });
});


/* GET Orders. */
apparelsRouter.get('/myOrders', curectMiddlewares.getClothCategory, function(req, res, next) {
  res.render('apparels/my_orders',{
    page: 'Orders',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
    categories_array: req.clothCategories,
    product_categories: req.productCategories,
    message:req.query.message
  });
});

/* GET each blog page. */
apparelsRouter.get('/cart', curectMiddlewares.getClothCategory,curectMiddlewares.getCitiesStates, function(req, res, next) {
  res.render('apparels/cart',{
    page: 'Cart',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
    categories_array: req.clothCategories,
    product_categories: req.productCategories,
    cities:req.cities,
    states:req.states,
  });
});

/* GET each blog page. */
apparelsRouter.get('/checkout', curectMiddlewares.getClothCategory,curectMiddlewares.getCitiesStates, function(req, res, next) {
  res.render('apparels/checkout',{
    page: 'Checkout',
    firebaseKey: constants.firebaseWebApiKey,
    id:req.params.id,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
    categories_array: req.clothCategories,
    product_categories: req.productCategories,
    cities:req.cities,
    states:req.states,
    product_id: req.query.product_id,
    selected_size: req.query.size,
  });
});

/* GET privacy policy page. */
apparelsRouter.get('/privacy-policy', function(req, res, next) {
  res.render('apparels/privacy_policy',{
    page: 'Privacy Policy',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
  });
});

/* GET FAQ page. */
apparelsRouter.get('/faq', curectMiddlewares.getClothCategory , function(req, res, next) {
  res.render('apparels/faq',{
    page: 'FAQ',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    category:req.query.clothCategories ? req.query.clothCategories : '',
    mainUrl:constants.curectUrl,
    categories_array: req.clothCategories,
    product_categories: req.productCategories,
  });
});

/* GET Mobile Faq. */
apparelsRouter.get('/faq-mobile', function(req, res, next) {
  res.render('apparels/faq-mobile',{
    page: 'FAQ',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
  });
});

/* GET terms and condition page. */
apparelsRouter.get('/terms-conditions', function(req, res, next) {
  res.render('apparels/terms_and_condition',{
    page: 'Terms & Conditions',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
  });
});

/* GET  page. */
apparelsRouter.get('/refund-policy', function(req, res, next) {
  res.render('apparels/refund_policy',{
    page: 'Refund policy',
    firebaseKey: constants.firebaseWebApiKey,
    isDevelopment: constants.isDevelopment,
    baseUrl:constants.isDevelopment ? constants.devBaseUrl : constants.prodBaseUrl,
    mainUrl:constants.curectUrl,
  });
});


module.exports = apparelsRouter;