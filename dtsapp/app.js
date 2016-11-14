var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird').Promise;
//var logger = require('winston').logger;
//var config = require( './config');

var routes = require('./routes/index');
var users = require('./routes/users');
var userProfile = require('./routes/userProfile');
var resetPasscode = require('./routes/resetPasscode');
var customer = require('./routes/customer');
var Provider = require('./routes/serviceprovider');
var Booking = require('./routes/booking');
var util = require('./routes/util');
var ProviderLogin = require('./routes/providerlogin')
var Search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/findemail', userProfile.findEmail);
app.get('/checklogin', userProfile.checkCredential);
app.post('/addcred', userProfile.adduserProfile);
app.put('/updatecred', userProfile.updatenewPassword);
app.delete('/removecred/:id', userProfile.deleteuserProfile);

app.get('/checkemail', ProviderLogin.findEmail);
app.get('/verifylogin', ProviderLogin.checkCredential);
app.put('/updatelogin', ProviderLogin.updatenewPassword);
app.post('/addlogin', ProviderLogin.addproviderlogin);
app.delete('/removelogin', ProviderLogin.deleteproviderlogin);

app.get('/getCode', resetPasscode.find);
app.post('/storePasscode', resetPasscode.storePasscode);
app.delete('/removeCode', resetPasscode.deletePasscode);

app.get('/getCustomer', customer.findCustomer);
app.post('/addNewCustomer', customer.addNewCustomer);
app.delete('/removeCustomer', customer.deleteCustomer);
app.get('/getcustomerwithphone', customer.findCustomerWithPhone);

app.get('/getProvider', Provider.findserviceProvider);
app.post('/addNewProvider', Provider.addNewserviceProvider);
app.delete('/removeProvider', Provider.deleteserviceProvider);
app.get('/searchByType', Provider.searchByType);

app.get('/getBookingHistory', Booking.findBooking);
app.put('/cancelBooking', Booking.cancelBooking);
app.post('/newBooking', Booking.addNewBooking);
app.put('/changeDate', Booking.changeBookingDate);
app.delete('/removeBooking', Booking.deleteBooking);
app.put('/updateProviderLink', Booking.updateProviderLink);

app.get('/sendSMS', util.sendSMS);
app.get('/generatePass', util.passwordCode);
app.post('/sendmail', util.sendEmail);


app.get('/searchBooking', Search.bookingSearch);

 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

MongoClient.connect('mongodb://localhost:27017/bmf', { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;
  //console.log(app.locals.db);
  app.listen('3002', () => {
    console.log(`Node.js app is listening at http://localhost:3002`);
  });
});

/*app.listen(3000, function () {
  console.log('Application listening on port 3000!');
});*/

module.exports = app;