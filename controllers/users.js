const User = require('../models/schemas/user');
const bcrypt = require('bcrypt-nodejs');

exports.getUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err);
        res.json(users);
    });
};

exports.getUserById = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that ID');
        res.json(user);
    });
};

exports.createUser = (req, res, next) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        // username not already taken
        if (!user) { 
            let userData = {
                username: req.body.username,
                email: req.body.email,
                hash: req.body.hash
            };
            this.hash = bcrypt.hashSync(this.hash);
            let newUser = new User(userData);
            newUser.save((err, user) => {
                if (err) {
                    if (err.code === 11000) {
                        return res.status(400).send('User already exists');
                    }
                    return next(err);
                }
                return res.sendStatus(200);
            });
        }
        else {
            res.status(400).send('Username already taken.');
        }
    });
}

exports.updateUser = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('No user with that ID');
        
        // update user based on info in req body.
        user.username = req.body.username;
        user.email = req.body.email;
        user.hash = req.body.hash;
        
        user.save((err, user) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(400).send('User already exists');
                }
                return next(err);
            }
            return res.sendStatus(200);
        });
    });
};

exports.deleteUserById = (req, res, next) => {
    User.findOneAndRemove(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('No user with that ID');
        return res.sendStatus(200);
    })
}