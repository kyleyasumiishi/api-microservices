const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, trim: true, required: true, max: 30},
    lastName: {type: String, trim: true, required: true, max: 30},
    email: {type: String, unique: true, sparse: true},
    hash: {type: String, required: true}
});

// Virtual for user's full name
userSchema.virtual('name').get(function() {
    return this.firstName + ' ' + this.lastName;
});

// Virtual for user's URL
userSchema.virtual('url').get(function() {
    return '/users/' + this._id;
});

// Export model
module.exports = mongoose.model('User', userSchema); 