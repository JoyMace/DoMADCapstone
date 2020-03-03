
const mongoose = require('mongoose');
const crypto = require('crypto');

// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }, 
  email: { type: String, required: true }, 
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  hash: String, 
  salt: String, 
  phone: String, 
  dob: String, 
  locationID: String
});

/*
  Input: password
  Creates a unique salt for each user
  Then hashes the password with given salt
  The result is then stored in the database
*/

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/*
  Input: Password
  Hashes password with user's unique salt
  Compares the result to stored hash in database
*/

userSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash == hash;
};

const user = mongoose.model('User', userSchema);

module.exports = user
