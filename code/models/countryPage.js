
const mongoose = require('mongoose');
const crypto = require('crypto');

const countryPageSchema = new mongoose.Schema({
  name: String,
  abbreviation: String,
  organizations: [
    {
    name: String,
    website: String
    }
  ],
  donations: [ { itemID: String } ],
  generalInformation: {
    officialLanguages: [ String ],
    flag: String, // For now this is just a file location. Looking GridFS
    map: String, // Same as above 
    lat: Number,
    lon, Number
  },
  statistics: {
    DDCause: [ String ], // Top Ten Causes of Death and Disability
    DDRiskFactor: [ String ],
    HDI: Number,
    population: Number,
    percentPopPoverty: Number,
    percentRural: Number,
    airQualityIndex: Number,
    lifeExpectancy: Number,
    expYearsInSchool: Number,
    meanYearsInSchool: Number,
    GNI: Number,
    sources: [ String ] // We need to talk about this more and how we want to manage sources. Maybe we can make every statistic be an object: { Value: {}, Source: String }
  }
});

const countryPage = mongoose.model('Country', countryPageSchema);

module.exports = countryPage
