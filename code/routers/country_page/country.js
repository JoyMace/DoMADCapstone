const express = require('express');
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

  name = req.query.country;

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
      name: String

    example query:
      /api/country-page/country/get-organizations?name=Germany

    Returns the list of organizations associated with country's organizationIDs
*/
router.get('/get-organizations', (req, res) => {
  var query = req.query;
  Country.find(query, function(err, country) {
    if(err || country.length == 0) {
      return res.status(countryCodes.getOrganizations.countryNotFound.status).send({
        message: countryCodes.getOrganizations.countryNotFound.message
      });
    }else{
      if(!country[0].organizationIDs){
        return res.status(countryCodes.getOrganizations.organizationsNotFound.status).send({
          message: countryCodes.getOrganizations.organizationsNotFound.message
        })
      }else{
        var orgs = country[0].organizationIDs;
        var orgQuery = {_id: {$in: orgs}}; // this queries a list of ids
        Organization.find(orgQuery, function(err, organizations) {
          if(err || organizations.length == 0){
            return res.status(countryCodes.getOrganizations.organizationsNotFound.status).send({
              message: countryCodes.getOrganizations.organizationsNotFound.message
            });
          }else{
            return res.status(countryCodes.getOrganizations.success.status).send({
             organizations: organizations,
             message: countryCodes.getOrganizations.success.message
            });
          }
        })
      }
    }
  })
})


/*
    Insert Organizations API
    inputs:
      countryName: String,
      orgName: String

    alternative inputs:
      body: inputs[]

    inputs[]: A list of inputs, i.e. [{countryName: "country1", orgName: "orgA"}, {countryName: "country2", orgName: "orgA"}],
    
    PLEASE NOTE: This API expects the organizations to be the same. The countries may be different.
    If countryName is "Global", the API will attempt to insert given organization into ALL countries in the Database.

    Future work on this API: 
      Allow for multiple countries and multiple organizations at the same time
*/
router.post('/insert-organizations', (req, res) => {5
  var insertToAllCountries = false;
  if(Array.isArray(req.body)){
    var countryNames = [];
    for (var i = 0; i < req.body.length; i++){
      var curBody = req.body[i];
      countryNames.push(curBody.countryName);
      if(curBody.countryName == 'Global'){
        insertToAllCountries = true;
      }
    }
    var orgQuery = {orgName: req.body[0].orgName};
    var countryQuery = {name: {$in: countryNames}};
  }else{
    var orgQuery = {orgName: req.body.orgName}; 
    var countryQuery = {name: req.body.countryName};  
  }
  

  Organization.find(orgQuery, function(err, organizations) {
    if(err || organizations.length == 0){
      return res.status(countryCodes.insertOrganizations.organizationsNotFound.status).send({
        message: countryCodes.insertOrganizations.organizationsNotFound.message
      });
    }else{

      var updatedOrgIDs = []
      if(countryQuery.name == 'Global' || insertToAllCountries){
        countryQuery = {}; //Query all countries
      }
      Country.find(countryQuery, function(err, countries) {
        if(err || countries.length == 0) {
          return res.status(countryCodes.insertOrganizations.countriesNotFound.status).send({
            message: countryCodes.insertOrganizations.countriesNotFound.message
          });
        }else{
          var allCountriesPassed = true;
          var message = {};
          for (var i = 0; i < countries.length; i++){
            if (!countries[i].organizationIDs){
              countries[i].organizationIDs = [organizations[0]]; //ONLY ONE ORGANIZATION
            }else{              
              countries[i].organizationIDs.push(organizations[0]._id);
            }

            var updatedCountry = new Country(countries[i]);
            updatedCountry.save(function(err, savedCountry){
                if(err){
                  allCountriesPassed = false;
                  message[updatedCountry.name] = "Failed: Error saving updated country";
                }else{
                  message[updatedCountry.name] = "Success";
                }
            });
          }
          if(allCountriesPassed){
            return res.status(countryCodes.insertOrganizations.success.status).send({
              message: message
            });
          }
          else{
            return res.status(countryCodes.insertOrganizations.notAllCountriesUpdated.status).send({
              message: message
            });
          }
        }
      })
    }
  })
})


/*
    Remove Organizations API
    inputs:
      countryName: String,
      orgName: String

    alternative inputs:
      body: inputs[]

    inputs[]: A list of inputs, i.e. [{countryName: "country1", orgName: "orgA"}, {countryName: "country2", orgName: "orgA"}],
    
    PLEASE NOTE: This API expects the organizations to be the same. The countries may be different.
    If countryName is "Global", the API will attempt to remove given organization from ALL countries in the Database.

    Future work on this API: 
      Allow for multiple countries and multiple organizations at the same time
*/
router.post('/remove-organizations', (req, res) => {
  var removeFromAllCountries = false;
  if(Array.isArray(req.body)){
    var countryNames = [];
    for (var i = 0; i < req.body.length; i++){
      var curBody = req.body[i];
      countryNames.push(curBody.countryName);
      if(curBody.countryName == 'Global'){
        removeFromAllCountries = true;
      }
    }
    var orgQuery = {orgName: req.body[0].orgName}; //This is where the API assumes all organizations are the same
    var countryQuery = {name: {$in: countryNames}};
  }else{
    var orgQuery = {orgName: req.body.orgName}; 
    var countryQuery = {name: req.body.countryName};  
  }
  
  Organization.find(orgQuery, function(err, organizations) {
    if(err || organizations.length == 0){
      return res.status(countryCodes.removeOrganizations.organizationsNotFound.status).send({
        message: countryCodes.removeOrganizations.organizationsNotFound.message
      });
    }else{
      var updatedOrgIDs = []
      if(countryQuery.name == 'Global' || removeFromAllCountries){
        countryQuery = {}; //Queries all countries
      }

      Country.find(countryQuery, function(err, countries) {
        if(err || countries.length == 0) {
          return res.status(countryCodes.removeOrganizations.countriesNotFound.status).send({
            message: countryCodes.removeOrganizations.countriesNotFound.message
          });
        }else{
          var allCountriesPassed = true;
          var message = {};
          for (var i = 0; i < countries.length; i++){
            if(!countries[i].organizationIDs){
              message[updatedCountry.name] = "Failed: No Organizations to remove";
            }else{
              var deleteOrgIDs = [];
              for (var j = 0; j < organizations.length; j++) {
                deleteOrgIDs.push(organizations[j]._id);
              }

              var prevOrgs = countries[i].organizationIDs;
              countries[i].organizationIDs = prevOrgs.filter(curOrg => {
                var toKeep = true;
                for (var j = 0; j < deleteOrgIDs.length; j++){
                  if(curOrg.equals(deleteOrgIDs[j])){
                    toKeep = false;
                    deleteOrgIDs.splice(j, 1); //remove organization since it's already been covered
                    break;
                  }
                }
                return toKeep;
              });

              var updatedCountry = new Country(countries[i]); //this makes a mongoose country document that we can save
              updatedCountry.save(function(err, savedCountry){
                if(err){
                  allCountriesPassed = false;
                  message[updatedCountry.name] = "Failed: Error saving updated country";
                }else{
                  message[updatedCountry.name] = "Success";
                }
              });
            }
          }
          if(allCountriesPassed){
            return res.status(countryCodes.removeOrganizations.success.status).send({
              message: message
            });
          }
          else{
            return res.status(countryCodes.removeOrganizations.notAllCountriesUpdated.status).send({
              message: message
            });
          }
        }
      })
    }
  })
})

module.exports = router;


