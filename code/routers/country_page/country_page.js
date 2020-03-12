const express = require('express')
const router = express.Router();

const Country = require('../../models/country');


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
*/



/*
  Country info api:

  Gets the country info
*/

router.get('/country_info', (req, res) => {

  var country_info_data = [];

  Country.findById(countryID, function(err, country) {

    if(err) {
      return res.status(profileCodes.country.countryNotFound.status).send({
        message: profileCodes.country.countryNotFound.message
      });
    }
    else{
      country_info_data.push({countryName: country.name});
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
