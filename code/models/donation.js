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
  locationID: {type: String, required: true},
  tripID: {type: String, required:true},
  category: {type: String, enum: donationCategories},  
  donationDate: Date,
  reportingDate: {type: Date, default: Date.now},
  itemDescription: String,
  pictures: String, //String for now, maybe use gridfs?
  organization: Boolean, //could there be a better way to do this?
  suggestion: Boolean //could there be a better way to do this?
});

const donation = mongoose.model('Donation', donationSchema);

module.exports = donation
