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

    inputs[]: A list of inputs, i.e. [{countryName: "myCountry", orgName: "org1"}, {countryName: "myCountry", orgName: "org2"}],
      note that countryName is expected to be the same in all elements.

    Future work on this API: Allow for multiple countries and multiple organizations at the same time
*/
router.post('/insert-organizations', (req, res) => {

  //Handling of multiple organizations, still expecting them to be from the same country
  if(Array.isArray(req.body)){
    var orgNames = [];
    for (var i = 0; i < req.body.length; i++){
      var curBody = req.body[i];
      orgNames.push(curBody.orgName);
    }
    var orgQuery = {orgName: {$in: orgNames}};
    var countryQuery = {name: req.body[0].countryName}; 
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
      Country.find(countryQuery, function(err, country) {
        if(err || country.length == 0) {
          return res.status(countryCodes.insertOrganizations.countryNotFound.status).send({
            message: countryCodes.insertOrganizations.countryNotFound.message
          });
        }else{
          if (!country[0].organizationIDs){
            country[0].organizationIDs = organizations;
          }else{
            var prevOrgs = country[0].organizationIDs;
            for (var i = 0; i < prevOrgs.length; i++) {
              updatedOrgIDs.push(prevOrgs[i]);
            }
            for (var i = 0; i < organizations.length; i++) {
              updatedOrgIDs.push(organizations[i]._id);
            }
            country[0].organizationIDs = updatedOrgIDs;
          }

          var updatedCountry = new Country(country[0]);
          updatedCountry.save(function(err, savedCountry){
            if(err){
              return res.status(countryCodes.insertOrganizations.saveCountryFail.status).send({
                message: countryCodes.insertOrganizations.saveCountryFail.message
              })
            }else{
              return res.status(countryCodes.insertOrganizations.success.status).send({
                message: countryCodes.insertOrganizations.success.message
              })
            }
          });
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

    inputs[]: A list of inputs, i.e. [{countryName: "myCountry", orgName: "org1"}, {countryName: "myCountry", orgName: "org2"}],
      note that countryName is expected to be the same in all elements.

    Future work on this API: Allow for multiple countries and multiple organizations at the same time
*/
router.post('/remove-organizations', (req, res) => {
  
  //Handling of multiple organizations, still expecting them to be from the same country
  if(Array.isArray(req.body)){
    var orgNames = [];
    for (var i = 0; i < req.body.length; i++){
      var curBody = req.body[i];
      orgNames.push(curBody.orgName);
    }
    var orgQuery = {orgName: {$in: orgNames}};
    var countryQuery = {name: req.body[0].countryName}; 
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
      Country.find(countryQuery, function(err, country) {
        if(err || country.length == 0) {
          return res.status(countryCodes.removeOrganizations.countryNotFound.status).send({
            message: countryCodes.removeOrganizations.countryNotFound.message
          });
        }else{
          if(!country[0].organizationIDs){
            return res.status(countryCodes.removeOrganizations.noCountryOrganizations.status).send({
              message: countryCodes.removeOrganizations.noCountryOrganizations.message
            });
          }else{
            var updatedOrgIDs = [];
            var deleteOrgIDs = [];
            for (var i = 0; i < organizations.length; i++) {
              deleteOrgIDs.push(organizations[i]._id);
            }

            var prevOrgs = country[0].organizationIDs;
            updatedOrgIDs = prevOrgs.filter(curOrg => {
              var toKeep = true;
              for (var i = 0; i < deleteOrgIDs.length; i++){
                if(curOrg.equals(deleteOrgIDs[i])){
                  toKeep = false;
                  deleteOrgIDs.splice(i, 1); //remove organization since it's already been covered
                  break;
                }
              }
              return toKeep;
            });

            country[0].organizationIDs = updatedOrgIDs;
            var updatedCountry = new Country(country[0]); //this makes a mongoose country document that we can save
            updatedCountry.save(function(err, savedCountry){
              if(err){
                return res.status(countryCodes.removeOrganizations.saveCountryFail.status).send({
                  message: countryCodes.removeOrganizations.saveCountryFail.message
                })
              }else{
                return res.status(countryCodes.removeOrganizations.success.status).send({
                  message: countryCodes.removeOrganizations.success.message
                })
              }
            });
          }
        }
      })
    }
  })
})

module.exports = router;


