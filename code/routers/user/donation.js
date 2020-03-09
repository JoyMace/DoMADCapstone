const express = require('express')
const router = express.Router();

const Donation = require('../../models/donation');

const donationCodes = require('../../config/resCodes').donation;

/* 
	Donation API:
		Create new donation:
			- Input: donation info, newTripID, and a callback function
			- Create new mongoose donation object with given info
			- Save to database
			- Call callback with either success or fail information

	A Donation follows the following schema:
		itemName: {type: String, required: true},
	    rating: {type: Number, required: true},
	    locationID: {type: LocationSchema, required: true},
	    tripID: {type:String, required:true},
	    Category: {type:String, enum:['Health', 'Household', 'Clothing', 'Education', 'Art', 'Sports', 'Miscellaneous', 'Animal Welfare', 'Environment', 'Food']},  
	    donationDateTime: Date,
	    reportingDateTime: {type: Date, default: Date.now},
	    itemDescr: String,
	    pictures: String, //String for now, maybe use gridfs?
	    Organization: Boolean, //could there be a better way to do this?
	    Suggestion: Boolean //could there be a better way to do this?

	What we will actually send to this function is: 
		donationInformation (what will be stored in db),
		tripID,
		callbackFunction
*/

// CREATE DONATION
function createDonation(donationInformation, tripID, done) { //change this to a normal js function and find a way to export and import into trip.js
	//FUNCTION ASSUMES complete donation json including all possible attributes of a donation.

	const newDo = new Donation(donationInformation);
	newDo.tripID = tripID;

	newDo.save(function(err, donation) {
		if (err) {
			//send json error message, normally we would do this with res, but since this is an internal function just make json manuall
			done(true, {statusCode: donationCodes.report.addDonationFail.status,
				message: donationCodes.report.addDonationFail.message});
		} else {
			done(false, {statusCode: donationCodes.report.success.status,
				message: donationCodes.report.success.message});
		}
	}); //this will return nothing, since it will execute the callback function.
}



// DELETE
function deleteDonation(donationID, done) {
	//given donationID, find the donation and delete it.
}

module.exports = {'createDonation': createDonation, 'deleteDonation': deleteDonation};