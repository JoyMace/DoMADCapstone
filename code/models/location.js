
const mongoose = require('mongoose');
const crypto = require('crypto');

const locationSchema = new mongoose.Schema({
  
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  zip: String

});
