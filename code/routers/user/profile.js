const express = require('express')
const router = express.Router();

const User = require('../../models/user');
const Trip = require('../../models/trip');
const Donation = require('../../models/donation');

const profileCodes = require('../../config/resCodes').profile;


/*
  User profile api
  gets user info and returns it

  inputs:
    userID: String

  TODO:
    - get Total Donations count
*/


router.get('/profile', (req, res) => {
console.log(req.user);
  var userID;
  // checks if user is logged in or external request

  if ('userID' in req.query){
    userID = req.query.userID;
  } else if ('user' in req) {
    userID = req.user._id;
  } else {
    return res.status(profileCodes.profile.userNotGiven.status).send({
      message: profileCodes.profile.userNotGiven.message});
  }

  var userData = [];

  User.findById(userID, function(err, user) {

    if(err || user==null) {
      return res.status(profileCodes.profile.profileNotFound.status).send({
        message: profileCodes.profile.profileNotFound.message
      });
    }
    else{
      userData = {userName: user.username, firstName: user.firstName, lastName: user.lastName,
                signupDate: user.signupDate, locationID: user.locationID};

      Trip.aggregate( [ 
        { $match: { userID : userID } },
        { $group: { _id : null, count: { $sum : 1 } } } ], function(err, user) {
        
        if(err) {
          return res.status(profileCodes.profile.tripcountNotFound.status).send({
            message: profileCodes.profile.tripcountNotFound.message
          });
        }
        else{
          userData['tripsCount'] = user[0] ? user[0].count : 0
          console.log("USER TRIP COUNT", userData['tripsCount'], user[0]);
          Trip.aggregate( [
            { $lookup:
              {
                from: "Donations",
                localField: "userID",
                foreignField: "tripID",
                as: "matched-docs"
              }
            }, 
            { $match: { userID : userID },  },           
            { $group: { _id : null, count: { $sum : 1 } } }], function(err, user) {

            if(err) {
              return res.status(profileCodes.profile.donationcountNotFound.status).send({
                message: profileCodes.profile.donationcountNotFound.message
              });
            }
            else{
              userData['donationCount'] = user[0] ? user[0].count : 0
              console.log("USER DONATION COUNT", userData['donationCount'], user[0]);
              return res.status(profileCodes.profile.success.status).send({userData: userData});
            }
          });
        }
      });
    }
  });
});

module.exports = router;
