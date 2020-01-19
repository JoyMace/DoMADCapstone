
const mongoose = require('mongoose');
const crypto = require('crypto');

// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  hash: String,
  salt: String,
  phone: String,
  dob: String,
  socialMedia: [
    {
    website: String, // Facebook, Instagaram, ...
    link: String // Unsure how this works for social media
    }
  ] ,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String   
  },
  donations: [
    {
      itemID: String,
      dateTime: { type: Date, default: Date.now },
      pictures: String, // Need to find out how to store pictures ( maybe GridFS )
      description: String,
      quantity: String
    }
  ]
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

const user = mongoose.model('user', userSchema);

module.exports = user
