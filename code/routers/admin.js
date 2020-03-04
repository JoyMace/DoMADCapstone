const express = require('express')
const router = express.Router();

const adminCodes = require('../config/resCodes').admin;
const Trip = require('../models/trip');

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

module.exports = router;
