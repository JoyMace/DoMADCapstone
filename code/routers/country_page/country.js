const express = require('express')
const router = express.Router();

const Country = require('../../models/country');
const Organization = require('../../models/organization');

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


router.post('/insert-country-info', (req, res) => {

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

router.get('/get-country-info', (req, res) => {

  var name = req.body.name;

  var query = { name: name };

  Country.find(query, function(err, country) {

    if(err) {
      return res.status(countryCodes.countryInfo.countryNotFound.status).send({
        message: countryCodes.countryInfo.countryNotFound.message
      });
    }
    else{
      countryInfoData = {countryName: country[0].name, abbreviation: country[0].abbreviation,
            generalInformation: country[0].generalInformation, statistics: country[0].statistics};
      return res.status(countryCodes.countryInfo.success.status).send({countryInfoData: countryInfoData});
    }


  });

});



/*
    Get Country organizations api
    inputs:
      countryName: String

    Returns the list of organizations associated with given country
*/
router.get('/get-organizations', (req, res) => {
  name = req.body.name;

  var query = {name: name};
  Country.find(query, function(err, country) {
    if(err) {
      return res.status(countryCodes.getOrganizations.countryNotFound.status).send({
        message: countryCodes.getOrganizations.countryNotFound.message
      });
    }else{
      return res.status(countryCodes.getOrganizations.success.status).send({
        organizations: country[0].organizations,
        message: countryCodes.getOrganizations.success.message
      });
    }
  })
})



module.exports = router;
