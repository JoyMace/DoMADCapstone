const express = require('express');
const router = express.Router();
const badwords = require('badwords-list').regex;

const User = require('../../models/user');
const Trip = require('../../models/trip');
const Location = require('../../models/location');
const Donation = require('../../models/donation');

const tripCodes = require('../../config/resCodes').trip;
const donationFunc = require('./donation');

/*
  report trip api

  inputs:
    userID: String
    tripDate: Date
    country: String
    city: String
    donations: donationJSON[]
    notes: String
    isPrivate: boolean

  donationJSON: contains any infrmation that a donations has (item name, rating, etc.)

  creates new trip entry
  calls function to create new donations with reference to the new trip

*/
router.post('/report', function(req, res) {
  console.log("POST REQUEST USER", req.user);
  const {tripDate, country, city, donations, notes, isPrivate } = req.body;

  // check for inappropriate words in 
  var requestString = JSON.stringify(req.body);
  var badCheck = [...requestString.matchAll(badwords)]
  if( badCheck.length ){
    return res.status(tripCodes.report.badWordsFound.status).send({
      message: tripCodes.report.badWordsFound.message});
  }

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

  var newTrip = new Trip();

  newTrip.userID = userID;
  newTrip.tripDate = tripDate;
  newTrip.notes = notes;
  newTrip.isPrivate = isPrivate;
  
  var locationQuery = {
    country: country,
    city: city
  }

  Location.findOneOrCreate(locationQuery, function(err, loc){ 

    if (err) {
      // TODO: unit test location lookup fail
      return res.status(tripCodes.report.locationLookupFail.status).send({
        message: tripCodes.report.locationLookupFail.message
      });
    }

    newTrip.locationID = loc._id;
    newTrip.save(function(err, trip) {
      if (err) {
        return res.status(tripCodes.report.addTripFail.status).send({
          message: tripCodes.report.addTripFail.message
        });
      } else {
        var donationArr = [];

        // loops through all donations given and adds any info they need
        for (var i = 0; i < donations.length; i++) {
          var fullDonationInformation = donations[i]
          fullDonationInformation['locationID'] = loc._id;
          fullDonationInformation['donationDate'] = tripDate;
          
          donationArr.push(fullDonationInformation);
        }
    
        donationFunc.createMultipleDonations(donationArr, trip._id, function(err, info) {
          if (err) {
            console.log(err)
            return res.status(tripCodes.report.addTripFail.status).send({
              message: tripCodes.report.addTripFail.message
            });
          } else {
            return res.status(tripCodes.report.success.status).send({
              message: tripCodes.report.success.message
            });
          }
        });
      }
    });
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
  populate_match = {};
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
      query['adminHide'] = false;
    }
  }

  if('country' in req.query){
    populate_match['country'] = req.query.country
  }

  if('city' in req.query){
    populate_match['city'] = req.query.city
  }

  if('limit' in req.query){
    limit = req.query.limit;
  }

  if('offset' in req.query){
    offset = req.query.offset;
  }

  Trip.find(query)
      .populate({ path:'locationID', match:populate_match })
      .skip(offset)
      .limit(limit)
      .sort({reportDate: -1})
      .exec(function(err, trips) {

        // get all trip ids
        tripIDs = []
        trips.forEach(trip => {
          tripIDs.push(trip._id);
        });

        donationQuery = {
          'tripID': { $in: tripIDs } 
        }

        Donation.find(donationQuery)
          .populate({ path:'locationID' })
          .exec(function(err, donations) {


            // Load donations into JSON where it is asociated with it's tripID
            donationByTripID = {}

            donations.forEach(donation => {
              if (donation.tripID in donationByTripID) {
                donationByTripID[donation.tripID].push(donation);
              } else {
                donationByTripID[donation.tripID] = [ donation ];
              }
            });

            // add donation information to each trip
            for(let i = 0; i < trips.length; i++) {
              trips[i]["donations"] = donationByTripID[trips[i]._id];
            }
            // need to convert the trips to a modifiable format since mongoose returns a const
            const tempTrips = trips;
            trips = []
            tempTrips.forEach(trip => {
              var newTrip = { ...trip, status: 'ok' }._doc;
              newTrip.donations = donationByTripID[trip._id];
              trips.push(newTrip);
            });

            if(err) {
              return res.status(tripCodes.allTrips.tripsNotFound.status).send({
                message: tripCodes.allTrips.tripsNotFound.message
              });
            }
            trips = trips.filter(trip => trip['locationID'])
            return res.status(tripCodes.allTrips.success.status).send({trips: trips});
          });


      });

});

/*
  all trips

  inputs:
    onlyPublic: boolean (optional)
    limit: Int (optional default=50)
    offset: Int (optional default=0)
    country: String (optional)
    city: String (optional)
  
  returns all trips from the trip database
    - if set, will only return public trips
  
*/
router.get('/all-trips', function(req,res) {

  query = {};
  populate_match = {};
  limit = 50;
  offset = 0;

  if('onlyPublic' in req.query){
    if(req.query.onlyPublic){
      query['isPrivate'] = false;
      query['adminHide'] = false;
    }
  }

  if('country' in req.query){
    populate_match['country'] = req.query.country
  }

  if('city' in req.query){
    populate_match['city'] = req.query.city
  }

  if('limit' in req.query){
    limit = parseInt(req.query.limit);
  }

  if('offset' in req.query){
    offset = parseInt(req.query.offset);
  }

  Trip.find(query)
      .populate({ path:'locationID', match:populate_match })
      .skip(offset)
      .limit(limit)
      .sort({reportDate: -1})
      .exec(function(err, trips) {

        // get all trip ids
        tripIDs = []
        trips.forEach(trip => {
          tripIDs.push(trip._id);
        });

        donationQuery = {
          'tripID': { $in: tripIDs } 
        }

        Donation.find(donationQuery)
          .populate({ path:'locationID' })
          .exec(function(err, donations) {


            // Load donations into JSON where it is asociated with it's tripID
            donationByTripID = {}

            donations.forEach(donation => {
              if (donation.tripID in donationByTripID) {
                donationByTripID[donation.tripID].push(donation);
              } else {
                donationByTripID[donation.tripID] = [ donation ];
              }
            });

            // add donation information to each trip
            for(let i = 0; i < trips.length; i++) {
              trips[i]["donations"] = donationByTripID[trips[i]._id];
            }
            // need to convert the trips to a modifiable format since mongoose returns a const
            const tempTrips = trips;
            trips = []
            tempTrips.forEach(trip => {
              var newTrip = { ...trip, status: 'ok' }._doc;
              newTrip.donations = donationByTripID[trip._id];
              trips.push(newTrip);
            });

            if(err) {
              return res.status(tripCodes.allTrips.tripsNotFound.status).send({
                message: tripCodes.allTrips.tripsNotFound.message
              });
            }

            // remove objects with null locationID
            trips = trips.filter(trip => trip['locationID'])

            return res.status(tripCodes.allTrips.success.status).send({trips: trips});
          });
      });
});

module.exports = router;
