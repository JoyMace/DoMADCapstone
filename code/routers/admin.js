const express = require('express')
const router = express.Router();

const adminCodes = require('../config/resCodes').admin;
const Trip = require('../models/trip');
const User = require('../models/user');

/*
  toggle a trip's privacy setting
  lets admin users hide content they don't want displayed

  input:
    tripID: String
*/
router.post('/toggle-hide', function(req, res) {

  tripID = req.body.tripID;

  Trip.findById(tripID, function(err, trip) {
    if (err || !trip) {
      return res.status(adminCodes.toggleHide.tripNotFound.status).send({
        message: adminCodes.toggleHide.tripNotFound.message
      });
    } else {
      trip.adminHide = !trip.adminHide;
      trip.save(function(err, updateTrip) {
        if (err) {
          return res.status(adminCodes.toggleHide.tripUpdateFail.status).send({
            message: adminCodes.toggleHide.tripUpdateFail.message
          }); 
        } else {
          return res.status(adminCodes.toggleHide.success.status).send({
            message: adminCodes.toggleHide.success.message
          });
        }
      });
    }
  });
});

/*
  Ban user

  input:
    username: String or 
    email: String
*/
router.put('/ban-user', function(req, res) {

  var filter = null
  if('username' in req.body){
    filter = { username: req.body.username }
  } else if('email' in req.body) {
    filter = { username: req.body.username }
  } else {
    return res.status(adminCodes.banUser.missingInfo.status).send({
      message: adminCodes.banUser.missingInfo.message
    }); 
  }
  var update = { banned: true }

  User.findOneAndUpdate(filter, update, {new: true}, function(err, user){
    if (err) {
      return res.status(adminCodes.banUser.updateFail.status).send({
        message: adminCodes.banUser.updateFail.message
      }); 
    } else if ( user == null ){
      return res.status(adminCodes.banUser.userNotFound.status).send({
        message: adminCodes.banUser.userNotFound.message
      }); 
    }
    return res.status(adminCodes.banUser.success.status).send({
      message: adminCodes.banUser.success.message
    }); 
  });
});

/*
  Unban user

  input:
    username: String or 
    email: String
*/
router.put('/unban-user', function(req, res) {

  var filter = null
  if('username' in req.body){
    filter = { username: req.body.username }
  } else if('email' in req.body) {
    filter = { username: req.body.username }
  } else {
    return res.status(adminCodes.unbanUser.missingInfo.status).send({
      message: adminCodes.unbanUser.missingInfo.message
    }); 
  }
  var update = { banned: false }

  User.findOneAndUpdate(filter, update, {new: true}, function(err, user){
    if (err) {
      return res.status(adminCodes.unbanUser.updateFail.status).send({
        message: adminCodes.unbanUser.updateFail.message
      }); 
    } else if ( user == null ){
      return res.status(adminCodes.unbanUser.userNotFound.status).send({
        message: adminCodes.unbanUser.userNotFound.message
      }); 
    }
    return res.status(adminCodes.unbanUser.success.status).send({
      message: adminCodes.unbanUser.success.message
    }); 
  });
});


module.exports = router;
