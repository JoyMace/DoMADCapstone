
const mongoose = require('mongoose');
const crypto = require('crypto');

const tripSchema = new mongoose.Schema({

  locationID: {type: mongoose.Schema.Types.ObjectId, ref:'Location', required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
  reportingDate: {type: Date, default: Date.now},
  tripDate: Date,
  notes: String,
  isPrivate: Boolean,
  adminHide: Boolean

});

const trip = mongoose.model('Trip', tripSchema);

module.exports = trip
