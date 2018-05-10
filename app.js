const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('morgan');
const createError = require('http-errors');
const config = require('./models/config');

// Import routes 
const routes = require('./routes/routes');

// Create Express application
const app = express();

// Set up mongoose connection
const dbUrl = config.dbUrl;
const mongoDB = process.env.MONGODB_URL || dbUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set application settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Mount middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.err = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Listen for connections
app.listen(app.get('port'), () => {
  console.log('Server started on port ' + app.get('port'));
});

module.exports = app;
