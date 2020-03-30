
const mongoose = require('mongoose');
const crypto = require('crypto');

const locationSchema = new mongoose.Schema({
  
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  zipCode: String

});

const location = mongoose.model('Location', locationSchema);

module.exports = location
