const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    user: {type: String, trim: true, required: true},
    email: {type: String, unique: true, sparse: true},
    hash: {type: String, required: true},
    isAdmin: Boolean,
    token: String
});

// Virtual for user's URL
userSchema.virtual('url').get(function() {
    return '/users/' + this._id;
});

// method for validating password
userSchema.methods.comparePassword = function(pw, callback) {
    bcrypt.compare(pw, this.hash, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Export model
module.exports = mongoose.model('User', userSchema); 