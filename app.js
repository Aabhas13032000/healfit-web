var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');

var mainRouter = require('./routes/main/index');
var adminRouter = require('./routes/admin/admin');
var apiRouter = require('./routes/api/api');

var app = express();
app.use(cors());

// app.listen(3000,'192.168.1.16');
// app.listen(3000,'192.168.29.248');
app.listen(3000,'172.20.10.3');
// app.listen(3000,'192.168.29.248');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Main route
app.use('/', mainRouter);

//Main route
app.use('/api', apiRouter);

//Admin route
app.use('/admin', session({
  secret: 'Keyboard Cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
   maxAge: 24 * 60 * 60 * 1000,
  }
}), adminRouter);

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

module.exports = app;
