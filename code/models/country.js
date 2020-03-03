
const mongoose = require('mongoose');
const crypto = require('crypto');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  abbreviation: { type: String, required: true },
  generalInformation: {
    officialLanguages: [ String ],
    flag: String, // For now this is just a file location. Looking GridFS
    map: String, // Same as above 
    locationID: String
  },
  statistics: {
    totalElectricity: mongoose.Types.Decimal128,
    ruralElectriity: mongoose.Types.Decimal128
  }
});

const country = mongoose.model('Country', countrySchema);

module.exports = country
