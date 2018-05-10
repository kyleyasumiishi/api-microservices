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

// Users routes
router.get('/users/:username', function(req, res, next) {
    User.findOne({ username: req.params.username }, function(err, user) {
        if (err) return next(err);
        if (!user) return next(404);
        res.render('profile', { user: user });
    });
});

router.get('/users', function(req, res, next) {
    res.redirect('/');  // last
});

// Authentication routes
router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Sign Up' });
});

router.post('/signup', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.log('The error is: ' + err);
            return next(err);
        }
        if (user) {
            req.flash('error', 'User already exists');
        }

        let newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    })
}, passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

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

// create - this will be integrated into signup once auth created
router.route('/test')
  .get(users.getUsers)
  .post(users.createUser);

router.route('/test/:id')
  .get(users.getUserById)
  .put(users.updateUser)
  .delete(users.deleteUserById);

module.exports = router;