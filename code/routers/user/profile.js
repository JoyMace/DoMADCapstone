const express = require('express')
const router = express.Router();

const User = require('../../models/user');

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
    //return profileCodes.report.userNotGiven.message
  }


  User.findById(userID, function(err, user) {

    if(err) {
      return res.status(profileCodes.profileReport.profileNotFound.status).send({
        message: profileCodes.profileReport.profileNotFound.message
      });
    }
    return res.status(profileCodes.profileReport.success.status).send({user: user.firstName});

  });
});

module.exports = router;
