const express = require('express')
const router = express.Router();

const User = require('../../models/user');
const Trip = require('../../models/trip');

const tripCodes = require('../../config/resCodes').trip;

/*
  report trip api

  required form inputs:
    tripDate: date // figure out how to handle this
    tripLoc: text
    donations: text[] (assumption)
    ratings: int[] (assumption)
    notes: text
    isPrivate: checkbox (boolean)

  creates a new donation entry
  creates a new trip entry using new donation id
  adds new trip to the currently signed in user's trips using new trip id
*/
router.post('/report', function(req, res) {
  const {tripDate, tripLoc, donations, ratings, notes, isPrivate } = req.body;

  var userID;
  // checks if user is logged in or external request
  if ('user' in req){
    userID = req.user._id;
  } else {
    userID = req.body._id;
  }

  // TODO: When locations implemented change this value
  var locationID = '123';

  // TODO: Integrate donations when created
  // https://stackoverflow.com/questions/6854431/how-do-i-get-the-objectid-after-i-save-an-object-in-mongoose
  var donationIDs = ['456'];

  var newTrip = new Trip();

  newTrip.locationID = locationID;
  newTrip.tripDate = tripDate;
  newTrip.donationIDs = donationIDs;
  newTrip.notes = notes;
  newTrip.isPrivate = isPrivate;

  newTrip.save(function(err, trip) {
    if (err) {
      return res.status(tripCodes.report.addTripFail.status).send({
        message: tripCodes.report.addTripFail.message
      });
    } else {

      User.findById(userID, function(err, user) {
        if (err || !user) {
          return res.status(tripCodes.report.userNotFound.status).send({
            message: tripCodes.report.userNotFound.message
          });
        }
        if('tripIDs' in user == false){
          user.tripIDs = [];
        }
        user.tripIDs.push(trip._id);
        user.save(function(err, user) {
          if (err) {
            return res.status(tripCodes.report.userUpdateFail.status).send({
              message: tripCodes.report.userUpdateFail.message
            });
          } else {
            return res.status(tripCodes.report.success.status).send({
              message: tripCodes.report.success.message
            });
          }
        });
      });
    }
  });
});

/*
  toggle a trip's privacy setting
*/
router.post('/toggle-privacy', function(req, res) {
  // get trip id somehow
  tripID = req.body._id;

  Trip.findById(tripID, function(err, trip) {
    if (err || !trip) {
      return res.status(tripCodes.togglePrivacy.tripNotFound.status).send({
        message: tripCodes.togglePrivacy.tripNotFound.message
      });
    } else {
      trip.isPrivate = !trip.isPrivate;
      trip.save(function(err, updateTrip) {
        if (err) {
          return res.status(tripCodes.togglePrivacy.tripUpdateFail.status).send({
            message: tripCodes.togglePrivacy.tripUpdateFail.message
          }); 
        } else {
          return res.status(tripCodes.togglePrivacy.success.status).send({
            message: tripCodes.togglePrivacy.success.message
          });
        }
      });
    }
  });
});

/*
  delete trip
  
  checks if this trip exists and then tries to delete it
*/
router.post('/delete-trip', function(req, res) {
  // get trip id somehow
  tripID = req.body._id;

  Trip.count({_id: tripID}, function(err, count) {
    if (err) {
      return res.status(tripCodes.deleteTrip.checkTripExistFail.status).send({
        message: tripCodes.deleteTrip.checkTripExistFail.message
      });
    } else if ( count == 0 ) {
      return res.status(tripCodes.deleteTrip.tripNotFound.status).send({
        message: tripCodes.deleteTrip.tripNotFound.message
      });
    } else {
      Trip.deleteOne({ _id: tripID }, function (err) {
        if (err) {
          return res.status(tripCodes.deleteTrip.deleteTripFail.status).send({
            message: tripCodes.deleteTrip.deleteTripFail.message
          });
        } else {
          return res.status(tripCodes.deleteTrip.success.status).send({
            message: tripCodes.deleteTrip.success.message
          });
        }
      });
    }
  });
});

/*
  trips

  gets all the trips for a given user
  TODO: figure out how to get send get request for
*/
router.get('/trips', function(req, res) {
  var userID;
  
  // checks if user is logged in or external request
  if ('user' in req){
    userID = req.user._id;
  } else {
    userID = req.query._id;
  }
  User.findById(userID, function (err, user) { 

    if (err || !user) {
      return res.status(tripCodes.trips.userNotFound.status).send({
        message: tripCodes.trips.userNotFound.message
      });
    }
    
    if (!('tripIDs' in user)) {
      return res.status(tripCodes.trips.success.status).send({trips: []});
    } else {
      Trip.find({'_id': { $in: user.tripIDs }}, function(err, trips){
        if (err) {
          return res.status(tripCodes.trips.tripsNotFound.status).send({
            message: tripCodes.trips.tripsNotFound.message
          });
        }
        return res.status(tripCodes.trips.success.status).send({trips: trips});
      });
    }
  });
});

module.exports = router;
