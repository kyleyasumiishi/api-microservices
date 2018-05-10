const User = require('../models/schemas/user');
const jwt = require('jwt-simple');
const config = require('../models/config');

exports.loginUser = function(req, res, next) {
    if (!req.body.username) {
        return res.status(400).send('Missing username');
    }
    if (!req.body.password) {
        return res.status(400).send('Missing password');
    }
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that username');

        console.log(user);
        console.log(req.body);

        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) return next(err);
            if (!isMatch) return res.status(401).send('Incorrect password');

            let payload = {
                id: user._id,
                email: user.email,
            }

            let token = jwt.encode(payload, config.secret);

            user.token = token;

            user.save((err) => {
                if (err) return next(err);
                return res.render('profile', { title: 'Hello ' + user.username });
            });
        });
    });
};