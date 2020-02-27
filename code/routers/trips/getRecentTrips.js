const express = require('express');
const router = express.Router();
const Trip = require('../../models/trip');
const tripCodes = require('../../config/resCodes').trip;

/* API for recent donations */

router.get('/Blogs', function(req, res){
	// First load up the recent donations
	// Then display them by date (newest first)
	
	//find all non-private trips, sort them in DESC order by REPORTING DATE, then execute callback function
	Trip.find({isPrivate: false}, null, {sort: {reportingDate: -1}}, function(err, trips) {
		if (err) {
			//not sure if this is the right error message
			res.status(tripCodes.trips.tripsNotFound.status).send({
        		message: tripCodes.allTrips.tripsNotFound.message
    		});
		}else {
			// return a sorted json with all the trips that aren't private
			return res.status(tripCodes.allTrips.success.status).send({trips: trips});
		}
	})
});

module.exports = router;