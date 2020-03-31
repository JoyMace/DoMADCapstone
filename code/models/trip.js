
const mongoose = require('mongoose');
const crypto = require('crypto');

const tripSchema = new mongoose.Schema({

  locationID: {type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true},
  userID: {type: String, required: true},
  reportingDate: {type: Date, default: Date.now},
  tripDate: Date,
  pictures: String, // this will need to change. Setting to string temporarily
  notes: String,
  isPrivate: Boolean,
  adminHide: Boolean

});

const trip = mongoose.model('Trip', tripSchema);

module.exports = trip
