
const mongoose = require('mongoose');
const crypto = require('crypto');

const countrySchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  organizations: [
    {
    organizationID: String
    }
  ],
  donations: [ { donationID: String } ],
  generalInformation: {
    officialLanguages: [ String ],
    flag: String, // For now this is just a file location. Looking GridFS
    map: String, // Same as above 
    lat: Number,
    lon, Number
  },
  statistics: {
    DDCause: { value: [ String ], source: String }, // Top Ten Causes of Death and Disability
    DDRiskFactor: { value: [ String ], source: String }, // Top Ten Risk Factors of Death and Disability
    HDI: { value: Number, source: String },
    population: { value: Number, source: String },
    percentPopPoverty: { value: Number, source: String },
    percentRural: { value: Number, source: String },
    airQualityIndex: { value: Number, source: String },
    lifeExpectancy: { value: Number, source: String },
    expYearsInSchool: { value: Number, source: String },
    meanYearsInSchool: { value: Number, source: String },
    GNI: { value: Number, source: String },
  }
});

const country = mongoose.model('Country', countrySchema);

module.exports = country
