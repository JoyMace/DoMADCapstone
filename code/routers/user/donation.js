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
router.post('./createDonation', function(req, res) { //change this to a normal js function and find a way to export and import into trip.js
	//FUNCTION ASSUMES complete donation json including all possible attributes of a donation.

	const {donationInformation, tripID, cbFun} = req.body; 

	var userID;
	// checks if user is logged in or external request
	if ('userID' in req.body){
		userID = req.body.userID;
	} else if ('user' in req) {
		userID = req.user._id;
	} else {
		return res.status(donationCodes.report.userNotGiven.status).send({
			message: donationCodes.report.userNotGiven.message});
	}

	const newDo = new Donation();

	newDo.itemName = donationInformation.itemName;
	newDo.rating = donationInformation.rating;
	newDo.locationID = donationInformation.locationID;
	newDo.category = donationInformation.category;
	newDo.donationDateTime = donationInformation.donationDateTime;
	newDo.reportingDateTime = donationInformation.reportingDateTime;
	newDo.itemDescr = donationInformation.itemDescr;
	newDo.pictures = donationInformation.pictures;
	newDo.organization = donationInformation.organization;
	newDo.suggestion = donationInformation.suggestion;

	newDo.tripID = tripID;

	return newDo.save(cbfun(err, newDo); //this will return nothing, since it will execute the callback function.
})



// DELETE
router.delete('./deleteDonation', function(req, res) {
	//given donationID, find the donation and delete it.
});