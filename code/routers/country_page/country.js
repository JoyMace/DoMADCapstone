const express = require('express')
const router = express.Router();

const Country = require('../../models/country');

const countryCodes = require('../../config/resCodes').country;


/*
  Insert country info api

  inputs:
    name: String
    abbreviation: String
    generalInformation: Collection
    statistics: Collection

  Inserts the country information into the country database schema
  This is just a temporary api to insert data into the country schema
*/


router.post('/insert_country_info', (req, res) => {

  const {name, abbreviation, generalInformation, statistics} = req.body

  var userID;
  // checks if user is logged in or external request
  if ('userID' in req.body){
    userID = req.body.userID;
  } else if ('user' in req) {
    userID = req.user._id;
  } else {
    return res.status(countryCodes.insertCountry.userNotGiven.status).send({
      message: countryCodes.insertCountry.userNotGiven.message});
  }


  var newCountry = new Country();

  newCountry.name = name;
  newCountry.abbreviation = abbreviation;
  newCountry.generalInformation = generalInformation;
  newCountry.statistics = statistics;

  newCountry.save(function(err, country){

    if (err) {
      return res.status(countryCodes.insertCountry.addCountryFail.status).send({
        message: countryCodes.insertCountry.addCountryFail.message
      });
    } else {
      return res.status(countryCodes.insertCountry.success.status).send({
        message: countryCodes.insertCountry.success.message
      });
    }

  });



});
/*
  Country info api

  inputs:
    countryName: String

  Gets the country info
*/

router.get('/get_country_info', (req, res) => {

  var country_info_data = [];

  name = req.body.name;

  var query = { name: name };

  Country.find(query, function(err, country) {

    if(err) {
      return res.status(countryCodes.countryInfo.countryNotFound.status).send({
        message: countryCodes.countryInfo.countryNotFound.message
      });
    }
    else{
      country_info_data.push({countryName: country[0].name, abbreviation: country[0].abbreviation,
            generalInformation: country[0].generalInformation, statistics: country[0].statistics});
      return res.status(countryCodes.countryInfo.success.status).send({country_info_data: country_info_data});
    }


  });

});



/*
    TODO: Country organization info api
*/




module.exports = router;
