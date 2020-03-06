const express = require('express')
const router = express.Router();

const User = require('../../models/user');
const Trip = require('../../models/trip');

const tripCodes = require('../../config/resCodes').trip;

/*
  report trip api

  inputs:
    userID: String
    tripDate: Date
    tripLoc: String
    donations: String[] TODO: confirm how this is passed in
    ratings: String[] TODO: same as above
    notes: String
    isPrivate: boolean

  creates new trip entry
  calls function to create new donations with reference to the new trip

  TODO:
    - see how donation information is passed from front end
    - get trip id information
    - add picture support
    - integrate donation creation
*/
router.post('/report', function(req, res) {
  // TODO: figure out how donations are being passed to backend
  const {tripDate, tripLoc, donations, ratings, notes, isPrivate } = req.body;

  var userID;
  // checks if user is logged in or external request
  if ('userID' in req.body){
    userID = req.body.userID;
  } else if ('user' in req) {
    userID = req.user._id;
  } else {
    return res.status(tripCodes.report.userNotGiven.status).send({
      message: tripCodes.report.userNotGiven.message});
  }

  // TODO: get trip location ID ( check if location already exists, if so reference that, else create new location )
  var locationID = '123'

  var newTrip = new Trip();

  newTrip.locationID = locationID; 
  newTrip.userID = userID;
  newTrip.tripDate = tripDate;
  // TODO: add picture support
  newTrip.notes = notes;
  newTrip.isPrivate = isPrivate;

  newTrip.save(function(err, trip) {
    if (err) {
      return res.status(tripCodes.report.addTripFail.status).send({
        message: tripCodes.report.addTripFail.message
      });
    } else {
      // TODO: Integrate donations when created
      //      - Call function passing it tripID and a callback function
      
      return res.status(tripCodes.report.success.status).send({
        message: tripCodes.report.success.message
      });
    }
  });
});

/*
  toggle a trip's privacy setting

  input:
    tripID: String
*/
router.post('/toggle-privacy', function(req, res) {
  
  tripID = req.body.tripID;

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

  input: 
    tripID: String
  
  checks if this trip exists and then tries to delete it
*/
router.post('/delete', function(req, res) {
  // get trip id somehow
  tripID = req.body.tripID;

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
  user trips

  input:
    userID: String (optional if user is logged in with passport session)
    onlyPublic: boolean (optional)
    limit: Int (optional default=50)
    offset: Int (optional default=0)

  gets all the trips for a given user
    - will get the trips of a logged in user or given user  
    - if set, will only return public trips 
*/
router.get('/user-trips', function(req, res) {

  // default values
  query = {};
  limit = 50;
  offset = 0;
  
  // checks if user is logged in or external request
  if ('userID' in req.query){
    query['userID'] = req.query.userID;
  } else if ( 'user' in req ) {
    query['userID'] = req.user._id;
  } else {
    return res.status(tripCodes.userTrips.userNotGiven.status).send({
      message: tripCodes.userTrips.userNotGiven.message});
  }

  if('onlyPublic' in req.query){
    if(req.query.onlyPublic){
      query['isPrivate'] = false;
    }
  }

  if('limit' in req.query){
    limit = req.query.limit;
  }

  if('offset' in req.query){
    offset = req.query.offset;
  }

  Trip.find(query)
      .skip(offset)
      .limit(limit)
      .sort({reportDate: -1})
      .exec(function(err, trips) {
        if(err) {
          return res.status(tripCodes.allTrips.tripsNotFound.status).send({
            message: tripCodes.allTrips.tripsNotFound.message
          });
        }
        return res.status(tripCodes.allTrips.success.status).send({trips: trips});
      });

});

/*
  all trips

  inputs:
    onlyPublic: boolean (optional)
    limit: Int (optional default=50)
    offset: Int (optional default=0)
  
  returns all trips from the trip database
    - if set, will only return public trips
  
*/
router.get('/all-trips', function(req,res) {

  query = {};
  limit = 50;
  offset = 0;

  if('onlyPublic' in req.query){
    if(req.query.onlyPublic){
      query['isPrivate'] = false;
    }
  }

  if('limit' in req.query){
    limit = parseInt(req.query.limit);
  }

  if('offset' in req.query){
    offset = parseInt(req.query.offset);
  }

  Trip.find(query)
      .skip(offset)
      .limit(limit)
      .sort({reportDate: -1})
      .exec(function(err, trips) {
        if(err) {
          return res.status(tripCodes.allTrips.tripsNotFound.status).send({
            message: tripCodes.allTrips.tripsNotFound.message
          });
        }
        return res.status(tripCodes.allTrips.success.status).send({trips: trips});
      });
});

module.exports = router;
