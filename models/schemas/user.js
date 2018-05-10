const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, unique: true},
    displayName: String
});

// Virtual for user's URL
userSchema.virtual('url').get(function() {
    return '/users/' + this.username;
});

// Get user's name
userSchema.methods.name = function() {
    return this.displayName || this.username;
};

// Pre-save action to hash password
userSchema.pre('save', function(done) {
    let user = this;
    if (!user.isModified('password')) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return done(err);
        bcrypt.hash(user.password, salt, function(err, hashedPassword) {
            if (err) return done(err);
            this.password = hashedPassword;
            done();
        });
    });
});

// Method for validating password
userSchema.methods.cPassword = function(pw, callback) {
    bcrypt.compare(pw, this.hash, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Export model
module.exports = mongoose.model('User', userSchema); 