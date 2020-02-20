const express = require('express')
const router = express.Router();

const User = require('../../models/user');
const Trip = require('../../models/trip');

/*
  report trip api

  required form inputs:
    tripDate: date
    tripLoc: text
    donations: ?
    ratings: ?
    notes: text
    isPrivate: checkbox (boolean)

  creates a new donation entry
  creates a new trip entry using new donation id
  adds new trip to the currently signed in user's trips using new trip id
*/
router.post('/report-trip', function(req, res) {
  //const {tripDate, tripLoc, donations, ratings, notes, isPrivate } = req.body;
  var notes = 'test notes';
  var isPrivate = false;

  // get user id from passport session
  var userID = "5e4ea6d8e67ebe0b27e7dab8";

  // get location information from tripLoc
  var locationID = '123';

  // if there is a need convert tripDate to proper format
  var tripDate = '2002-12-09'

  // create donation objects for donations/ratings
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
      console.log(err)
      return res.status(400).send({
        message: 'Failed to add trip'
      });
    } else {

      User.findById(userID, function(err, user) {
        if (err) {
          return res.status(400).send({
            message: 'Failed to find user by ID'
          });
        }
        user.tripIDs.push(trip._id);
        user.save(function(err, trip) {
          if (err) {
            return res.status(400).send({
              message: 'Failed to update user'
            });
          } else {
            return res.status(200).send({
              message: 'Trip saved successfully'
            });
          }
        });
      });
    }
  });
});

/*
  toggle a trip's privacy setting
  
  TODO: Determine how to properly get trip id
*/
router.post('/toggle-trip-privacy', function(req, res) {
  // get trip id somehow
  tripID = 'test'

  Trip.findById(tripID, function(er, trip) {
    if (err) {
      return res.status(400).send({
        message: 'Failed to find trip by ID'
      });
    } else {
      trip.isPrivate = !trip.isPrivate;
      trip.save(function(err, updateTrip) {
        if (err) {
          return res.status(400).send({
            message: 'Failed to update trip'
          }); 
        } else {
          return res.status(200).send({
            message: 'Trip privacy successfully toggled'
          });
        }
      });
    }
  });
});

/*
  delete trip
  
  TODO: Determine how to properly get trip id
  checks if this trip exists and then tries to delete it
*/
router.post('/delete-trip', function(req, res) {
  // get trip id somehow
  tripID = 'test'

  Trip.count({_id: tripID}, function(err, count) {
    if (err) {
      return res.status(400).send({
        message: 'Failed to check if trip exists'
      });
    } else if ( count == 0 ) {
      return res.status(404).send({
        message: 'No trip with this id was found'
      });
    } else {
      Trip.deleteOne({ _id: tripID }, function (err) {
        if (err) {
          return res.status(400).send({
            message: 'Failed to delete trip by ID'
          });
        } else {
          return res.status(204).send({
            message: 'Trip successfully deleted'
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
  var ID = "5e4ea6d8e67ebe0b27e7dab8"
  User.findById(ID, function (err, user) { 

    if (err) { res.status(404).send({message:"Could not find user by id"}); }
    console.log('tripIDs' in user);
    if (!('tripIDs' in user)) {
      return res.status(200).send({trips: []});
    } else {
      Trip.find({'_id': { $in: user.tripIDs }}, function(err, trips){
        return res.status(200).send({trips: trips});
      });
    }
  });
});

module.exports = router;
