const express = require('express')
const router = express.Router();

const Country = require('../../models/country');

const countryCodes = require('../../config/resCodes').country;


// List of Apis needed

//Question:
// - Do we want to have apis for every tab or combine all of them in one?
// - Where is the data? Needs to be updated.
// - Are we inserting the country data thorough and API? Make an api to post/insert
//   country data into database.
// - Populate info to database

/*
  Insert country info api:
  Inserts the country information into the country database schema
  This is just a temporary post api to insert data into the country model
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
    return res.status(profileCodes.insertCountry.userNotGiven.status).send({
      message: profileCodes.insertCountry.userNotGiven.message});
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
  Country info api:

  Gets the country info
*/

router.get('/get_country_info', (req, res) => {

  var country_info_data = [];

  name = req.body.name;

  Country.findById(name, function(err, country) {

    if(err) {
      return res.status(countryCodes.countryInfo.countryNotFound.status).send({
        message: countryCodes.countryInfo.countryNotFound.message
      });
    }
    else{
      country_info_data.push({countryName: country.name, abbreviation: country.abbreviation,
            generalInformation: country.generalInformation, statistics: country.statistics});
      return res.status(countryCodes.countryInfo.success.status).send({country_info_data: country_info_data});
    }


  });

});


/*
  Might not need to create get Donations api and just call the one that
  already exists. (This will be called from the donations api)
*/


/*
  Country organization info api: gets the country organizations api
*/


/*
  Blog post Api???? Call the trip api
*/






module.exports = router;
