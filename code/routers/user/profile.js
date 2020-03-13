const express = require('express')
const router = express.Router();

const User = require('../../models/user');
const Trip = require('../../models/trip');

const profileCodes = require('../../config/resCodes').profile;


/*
  User profile api
  gets user info and returns it

  TODO:
    - get Total Donations count
*/


router.get('/profile', (req, res) => {

  var userID;
  // checks if user is logged in or external request
  if ('userID' in req.body){
    userID = req.body.userID;
  } else if ('user' in req) {
    userID = req.user._id;
  } else {
    return res.status(profileCodes.profile.userNotGiven.status).send({
      message: profileCodes.profile.userNotGiven.message});
  }

  var userData = [];

  User.findById(userID, function(err, user) {

    if(err) {
      return res.status(profileCodes.profile.profileNotFound.status).send({
        message: profileCodes.profile.profileNotFound.message
      });
    }
    else{
      userData.push({firstName: user.firstName, lastName: user.lastName,
                signupDate: user.signupDate, locationID: user.locationID});

      //Move this inside the User.findById call
      Trip.aggregate( [ { $group: { "_id" : userID, count: { $sum: 1 } } } ], function(err, user) {

        if(err) {
          return res.status(profileCodes.profile.tripcountNotFound.status).send({
            message: profileCodes.profile.tripcountNotFound.message
          });
        }
        else{
          userData.push({tripsCount: user[0].count});
          return res.status(profileCodes.profile.success.status).send({userData: userData});
        }
      });
    }


  });




});

module.exports = router;
