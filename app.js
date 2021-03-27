var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var transporter = require('./src/util/email.initializer');
let cors = require('cors');
var app = express();
var cron = require('node-cron');
const models = require('./src/database/models');
app.use(cors());

//Configure Database---------------------------------------------
models.sequelize.sync().then(function () {
  console.log("Database is connected");

  //Start Crons
  require('./src/util/crons') (cron, transporter);
});
//---------------------------------------------------------------

//Token validator
const passport = require('./src/util/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Server routes
require('./src/routes/index')(transporter, app, passport);

app.get('*',function (req, res) {
  res.redirect('https://prasanna.alwaysdata.net');
});

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
