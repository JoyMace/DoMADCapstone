
const mongoose = require('mongoose');
const crypto = require('crypto');

const tripSchema = new mongoose.Schema({

  locationID: {type: String, required: true},
  reportingDate: {type: Date, default: Date.now},
  tripDate: Date,
  donationIDs: [ String ],
  pictures: String, // this will need to change. Setting to string temporarily
  notes: String,
  isPrivate: Boolean

});

const trip = mongoose.model('Trip', tripSchema);

module.exports = trip
