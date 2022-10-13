var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');

//subdomain
// var subdomain = require('express-subdomain');
var vhost = require('vhost');

var https = require('https');
var http = require('http');
var fs = require('fs');

var mainRouter = require('./routes/main/index');
var apparelsRouter = require('./routes/apparels/apparels');
var apiRouter = require('./routes/api/api');
var apiBlogRouter = require('./routes/api/blog');
var apiBookRouter = require('./routes/api/book');
var apiProgramRouter = require('./routes/api/program');
var apiExpertsRouter = require('./routes/api/experts');
var apiCartRouter = require('./routes/api/cart');
var subscriptionRouter = require('./routes/subscriptions/subscriptions');
var notificationRouter = require('./routes/notifications/notification');
var adminRouter = require('./routes/admin/admin');
var blogAdminRouter = require('./routes/admin/blogs');
var trainerAdminRouter = require('./routes/admin/experts');
var commonAdminRouter = require('./routes/admin/common');
var bookAdminRouter = require('./routes/admin/books');
var userAdminRouter = require('./routes/admin/users');
var workoutAdminRouter = require('./routes/admin/workout');
var testimonialsAdminRouter = require('./routes/admin/testimonials');
var foodAdminRouter = require('./routes/admin/food');
var programsAdminRouter = require('./routes/admin/program');
var productsAdminRouter = require('./routes/admin/products');
var trainersAdminRouter = require('./routes/admin/trainers');
var subscriptionAdminRouter = require('./routes/admin/subscription');
var cronJob = require('./routes/notifications/cron-job');

var app = express();
var apparelsApp = express();
app.use(cors());
apparelsApp.use(cors());
var hostname = 'healfit.in';

//apparels
// app.use(subdomain('apparels', apparelsRouter));
app.use(vhost('currect', apparelsApp));

//for prod
// var options = {
//   key: fs.readFileSync("./certificates/private/private.key"),
//   cert: fs.readFileSync("./certificates/certificate.crt"),
//   ca: fs.readFileSync("./certificates/ca_bundle.crt"),
// };

// https.createServer(options, app).listen(443,hostname);

//for dev
http.createServer(app).listen(3000,() => {
  console.log('server started');
});

//for prod
// app.enable('trust proxy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

apparelsApp.set('views', path.join(__dirname, 'views'));
apparelsApp.set('view engine', 'ejs');

apparelsApp.use(logger('dev'));
apparelsApp.use(express.json());
apparelsApp.use(express.urlencoded({ extended: false }));
apparelsApp.use(cookieParser());
apparelsApp.use(express.static(path.join(__dirname, 'public')));

//for prod

// app.use(function(request, response, next) {
//   // console.log(response.getHeader);
//   // console.log(request);

//   if (!request.secure) {
//     //  return response.redirect("https://healfit.in" + request.url);
//     console.log('Not secure');
//   } else {
//     console.log('secure');
//   }

//   next();
// });

//Main route
app.use('/', session({
  secret: 'Keyboard Bat',
  resave: false,
  saveUninitialized: true,
  cookie: {
   maxAge: 365 * 24 * 60 * 60 * 1000,
  }
}), mainRouter);

//apparels main route
apparelsApp.use('/currect', session({
  secret: 'Keyboard Rat',
  resave: false,
  saveUninitialized: true,
  cookie: {
   maxAge: 365 * 24 * 60 * 60 * 1000,
  }
}), apparelsRouter);

//Api route
app.use('/api', apiRouter);

//Api blog route
app.use('/api/blogs', apiBlogRouter);

//Api book route
app.use('/api/books', apiBookRouter);

//Api program route
app.use('/api/programs', apiProgramRouter);

//Api experts route
app.use('/api/experts', apiExpertsRouter);

//Api experts route
app.use('/api/cart', apiCartRouter);

//subscription route
app.use('/subscription', subscriptionRouter);

//notification route
app.use('/notifications', notificationRouter);

//Admin route
app.use('/admin', session({
  secret: 'Keyboard Cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
   maxAge: 24 * 60 * 60 * 1000,
  }
}), adminRouter);

//Admin route
app.use('/admin/trainers', session({
  secret: 'Keyboard Cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
   maxAge: 24 * 60 * 60 * 1000,
  }
}), trainersAdminRouter);

//Admin common route
app.use('/admin/common', commonAdminRouter);

//Admin blog route
app.use('/admin/blogs', blogAdminRouter);

//Admin blog route
app.use('/admin/books', bookAdminRouter);

//Admin trainer route
app.use('/admin/experts', trainerAdminRouter);

//Admin user route
app.use('/admin/users', userAdminRouter);

//Admin workout route
app.use('/admin/workout', workoutAdminRouter);

//Admin testimonials route
app.use('/admin/testimonials', testimonialsAdminRouter);

//Admin food route
app.use('/admin/food', foodAdminRouter);

//Admin program route
app.use('/admin/programs', programsAdminRouter);

//Admin product route
app.use('/admin/products', productsAdminRouter);

//Admin subscription route
app.use('/admin/subscriptions',subscriptionAdminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app: app,
  apparelsApp: apparelsApp
};
