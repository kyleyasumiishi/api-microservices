const express = require('express');
const User = require('../models/schemas/user');
const users = require('../controllers/users');
const router = express.Router();
const passport = require('passport');

// Set useful variables for view templates rendered
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

// GET home page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'API and Microservice Projects' });
  });

// GET about page
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
  });

// User profile routes
router.get('/users/:username', users.ensureAuthenticated, users.getUserByUsername);
router.get('/users/:username/delete', users.ensureAuthenticated, users.deleteUserByUsername);
router.post('/users/:username', users.ensureAuthenticated, users.updateUserByUsername);
router.get('/users', users.getUsersPage);

// User authentication routes
router.get('/signup', users.getSignupPage);
router.post('/signup', users.signup, users.signupAuth);
router.get('/login', users.getLoginPage);
router.post('/login', users.loginAuth);
router.get('/logout', users.ensureAuthenticated, users.logout);

// API routes
router.get('/api/timestamp', function(req, res, next) {
    res.render('timestamp', { title: 'Timestamp' });
});

router.get('/api/headerparser', function(req, res, next) {
    res.render('headerparser', { title: 'Request Header Parser' });
});

router.get('/api/urlshortener', function(req, res, next) {
    res.render('urlshortener', { title: 'URL Shortener' });
});

router.get('/api/exercise', function(req, res, next) {
    res.render('exercise', { title: 'Exercise Tracker' });
});

router.get('/api/filemetadata', function(req, res, next) {
    res.render('filemetadata', { title: 'File Metadata' });
});

module.exports = router;