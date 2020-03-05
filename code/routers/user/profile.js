const express = require('express')
const router = express.Router();

const User = require('../../models/user');
const Trip = require('../../models/trip');

const profileCodes = require('../../config/resCodes').profile;



router.get('/profile', (req, res) => {


  var userID;
  // checks if user is logged in or external request
  if ('userID' in req.body){
    userID = req.body.userID;
  } else if ('user' in req) {
    userID = req.user._id;
  } else {
    return res.status(profileCodes.report.userNotGiven.status).send({
      message: profileCodes.report.userNotGiven.message});
  }

  var data = [];

  User.findById(userID, function(err, user) {

    if(err) {
      return res.status(profileCodes.profileReport.profileNotFound.status).send({
        message: profileCodes.profileReport.profileNotFound.message
      });
    }
    else{
      data.push({user: user.firstName, signupDate: user.signupDate, locationID: user.locationID});
    }



  });

  Trip.aggregate( [ { $group: { "_id" : userID, count: { $sum: 1 } } } ], function(err, user) {

    if(err) {
      return res.status(profileCodes.profileReport.tripcountNotFound.status).send({
        message: profileCodes.profileReport.tripcountNotFound.message
      });
    }
    else{
      data.push({tripCount: user[0].count});
      return res.status(profileCodes.profileReport.success.status).send({data: data});
    }
  });

});

module.exports = router;
