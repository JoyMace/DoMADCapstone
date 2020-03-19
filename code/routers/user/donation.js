const express = require('express')
const router = express.Router();

const Donation = require('../../models/donation');

const donationCodes = require('../../config/resCodes').donation;

/* 
	Donation Functions:
		Create new donation:
			- Input: donation info, newTripID, and a callback function with 3 parameters: error, donation, donationResCode
			- Create new mongoose donation object with given info
			- Save to database
			- Call callback with either success or fail information

		Delete give donation:
			- Input: donationID, callback function with 3 parameter: error, donation, donationResCode
			- Find and delte mongoose donation object based on donationID
			- Call callback with either success or fail 
*/


function createDonation(donationInformation, tripID, done) {
	const newDo = new Donation(donationInformation);
	newDo.tripID = tripID;
	newDo.save(function(err, donation) {
		if (err) {
			done(err, donation, donationCodes.saveDonation.addDonationFail);
		} else {
			done(err, donation, donationCodes.saveDonation.success);
		}
	});
	return
}

function deleteDonation(donationID, done) {
	Donation.findOneAndDelete({_id: donationID}, function(err, donation) {
		if(err){
			if(donation){ //if donation isn't undefined, then that means the deletion failed
				done(err, donation, donationCodes.deleteDonation.deleteDonationFail);
			}else{ //if donation IS undefined, that means mongoose couldn't find the donation
				done(err, donation, donationCodes.deleteDonation.donationNotFound);	
			}
		} else {
			done(err, donation, donationCodes.deleteDonation.success);
		}
	});
	return
}


module.exports = {'createDonation': createDonation, 'deleteDonation': deleteDonation};