/*
CRUD and authorization logic for users.
*/

const User = require('../models/schemas/user');
const passport = require('passport');

// Middleware for determining if the user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.params.username) {
            if (req.params.username === req.user.username) {
                next();
            }
            else {
                res.redirect('/');
            }
        } else {
            next();
        }
    } else {
        req.flash('info', 'You must be logged in to see this page.');
        res.redirect('/login');
    }
};

exports.getUserByUsername = (req, res, next) => {
    User.findOne({ username: req.params.username }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) return next(err);
        if (!user) return next(404);
        res.render('profile', { user: user });
    });
};

exports.deleteUserByUsername = (req, res, next) => {
    req.logout();
    User.findOneAndRemove({ username: req.params.username },
    (err, user) => {
        if (err) return next(err);
        return res.redirect('/');
    });
};

exports.updateUserByUsername = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ username: req.params.username }, function(err, user) {
        if (err) return next(err);
        user.username = username;
        user.email = email;
        user.password = password;
        user.save(next);
        let message = 'Profile changes successfully made!';
        res.render('profile', { user: user, message: message });
    });
};

exports.getUsersPage = (req, res, next) => {
    res.redirect('/');
}

exports.getSignupPage = (req, res, next) => {
    res.render('signup', { title: 'Sign Up' });
};

exports.signup = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username: username }, function(err, user) {
        if (err) {
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
    });
};

exports.signupAuth = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
});

exports.getLoginPage = (req, res, next) => {
    res.render('login', {title: 'Login' });
};

exports.loginAuth = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
};

