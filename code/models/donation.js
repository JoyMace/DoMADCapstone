// donation mongoose model
// might need to add a new category to determine if this is a past donation or a suggestions, according to thomas on google docs

// Used https://stackoverflow.com/questions/33934072/requiring-model-schemas-in-another-model-for-mongoose-in-different-files as a reference
const mongoose = require('mongoose');
const Location = require('./location');
const LocationSchema = mongoose.model('Location').schema;

const donationSchema = new mongoose.Schema({
  itemName: {type: String, required: true},
  rating: {type: Number, required: true},
  locationID: {type: LocationSchema, required: true},
  tripID: {type:String, required:true},
  category: {type:String, enum:['Health', 'Household', 'Clothing', 'Education', 'Art', 'Sports', 'Miscellaneous', 'Animal Welfare', 'Environment', 'Food']},  
  donationDateTime: Date,
  reportingDateTime: {type: Date, default: Date.now},
  itemDescr: String,
  pictures: String, //String for now, maybe use gridfs?
  organization: Boolean, //could there be a better way to do this?
  suggestion: Boolean //could there be a better way to do this?
});

const donation = mongoose.model('Donation', donationSchema);

module.exports = donation