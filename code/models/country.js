
const mongoose = require('mongoose');
const crypto = require('crypto');
const Organization = require('./organization');
const OrganizationSchema = mongoose.model('Organization').schema;

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalName: String,
  abbreviation: { type: String, required: true },
  generalInformation: {
    continentAbbr: String,
    continentName: String,
    currency: String,
    languages: [ String ],
    locationID: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'}
  },
  statistics: {
    population: mongoose.Types.Decimal128,
    HDIRank: mongoose.Types.Decimal128,
    GNI: mongoose.Types.Decimal128,
    lifeExpectancy: mongoose.Types.Decimal128,
    povertyPercent: mongoose.Types.Decimal128,
    popUrbanPercent: mongoose.Types.Decimal128,
    cleanWaterAccess:mongoose.Types.Decimal128,
    averageSchooling:mongoose.Types.Decimal128,
    electricityAccessRuralPop:mongoose.Types.Decimal128,
    electricityAccessTotalPop:mongoose.Types.Decimal128,    
  }
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country
