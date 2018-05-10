const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {type: String, trim: true, required: true},
    email: {type: String, unique: true, sparse: true},
    hash: {type: String, required: true},
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

userSchema.pre('save', function(callback) {
    if (!this.username) {
        return callback(new Error('Missing username'));
    }
    if (!this.hash) {
        return callback(new Error('Missing password'));
    }
    if (!this.email) {
        return callback(new Error('Missing email'));
    }
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email))) {
        return callback(new Error('Invalid email'));
    }
    this.hash = bcrypt.hashSync(this.hash);
    callback();
})

// Export model
module.exports = mongoose.model('User', userSchema); 