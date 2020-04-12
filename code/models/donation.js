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
  itemDescription: String,
  donationDateTime: Date,
  reportingDateTime: {type: Date, default: Date.now},
  organizationID: {type: mongoose.Schema.Types.ObjectId, ref:'Organization'},
  organization: Boolean, // since we only have a boolean on the front end we will just do this for now
  suggestion: Boolean
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation
