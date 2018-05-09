const User = require('../models/schemas/user');

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

    let userData = {};
    userData.username = req.body.username;
    userData.email = req.body.email;
    userData.hash = req.body.hash; 
    
    let newUser = new User(userData);
    newUser.save((err, user) => {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).send('User already exists');
            }
            return next(err);
        }
        return res.sendStatus(200);
    })
}

exports.updateUser = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('No user with that ID');
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.hash) {
            user.hash = req.body.hash;
        }
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