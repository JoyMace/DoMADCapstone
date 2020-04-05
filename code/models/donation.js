// donation mongoose model
// might need to add a new category to determine if this is a past donation or a suggestions, according to thomas on google docs

// Used https://stackoverflow.com/questions/33934072/requiring-model-schemas-in-another-model-for-mongoose-in-different-files as a reference
const mongoose = require('mongoose');
const Location = require('./location');
const LocationSchema = mongoose.model('Location').schema;

const donationCategories = ['Health', 'Household', 'Clothing', 'Education', 'Art', 
  'Sports', 'Miscellaneous', 'Animal Welfare', 'Environment', 'Food'];

const donationSchema = new mongoose.Schema({
  itemName: {type: String, required: true},
  rating: {type: Number, required: true},
  locationID: {type: mongoose.Schema.Types.ObjectId, ref:'Location', required: true},
  tripID: {type: mongoose.Schema.Types.ObjectId, ref:'Trip'},
  category: {type: String, enum: donationCategories},  
  donationDateTime: Date,
  reportingDateTime: {type: Date, default: Date.now},
  itemDescr: String,
  organizationID: {type: mongoose.Schema.Types.ObjectId, ref:'Organization'},
  suggestion: Boolean
});

const donation = mongoose.model('Donation', donationSchema);

module.exports = donation
