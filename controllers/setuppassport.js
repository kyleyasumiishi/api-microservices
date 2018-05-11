const passport = require('passport');
const User = require('../models/schemas/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    // Turn user object into ID.
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    // Turn ID into user object.
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

// Set up authentication strategy
passport.use('login', new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.log('findOne error: ' + err);
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'No user has that username' });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log('comparePassword error: ' + err);
                return done(err);
            } 
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid password' });
            }
        });
    });
}));