
const mongoose = require('mongoose');
const crypto = require('crypto');
const Organization = require('./organization');
const OrganizationSchema = mongoose.model('Organization').schema;

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true },
  organizationID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}],
  generalInformation: {
    officialLanguages: [ String ],
    flag: String, // For now this is just a file location. Looking GridFS
    map: String, // Same as above 
    locationID: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'}
  },
  statistics: {
    totalElectricity: mongoose.Types.Decimal128,
    ruralElectriity: mongoose.Types.Decimal128
  }
});

const country = mongoose.model('Country', countrySchema);

module.exports = country
