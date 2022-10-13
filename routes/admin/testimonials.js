const express = require('express');
const router = express.Router();

//Renders
const render = require('../../controllers/admin')

//Middlewares
const testimonialsMiddlewares = require('../../services/testimonials');

/* Testimonials */

//Main Page 
router.get('/',testimonialsMiddlewares.getTestimonials,render.getTestimonialsPage);
//Search Testimonials 
router.get('/getSearchTestimonials',testimonialsMiddlewares.getSearchTestimonials,render.getTestimonialsPage);
//Marked testimonial important
router.post('/markedTestimonialImportant',testimonialsMiddlewares.markedTestimonialImportant);
//Delete testimonial
router.post('/deleteTestimonial',testimonialsMiddlewares.deleteTestimonial);
//Add testimonial 
router.post('/addTestimonial',testimonialsMiddlewares.addTestimonial);
//save Each testimonial 
router.post('/saveTestimonial',testimonialsMiddlewares.saveTestimonial);
//save Each testimonial profile Image
router.post('/saveTestimonialCoverImage',testimonialsMiddlewares.saveCoverImage);

module.exports = router;