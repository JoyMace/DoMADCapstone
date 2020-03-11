const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const donationCodes = require('../config/resCodes/user/donation');
const testVar = require('../config/testVar'); // generic test donation
const Donation = require('../models/donation');

const donationFunctions = require('../routers/user/donation');

describe('Donation functions', function() {
  
  describe('Create Donation Test', function() {

    before(function(done) {
      var fakeDonation = new Donation(testVar.donationInformation);
      var mongooseSaveStub = sandbox.stub(Donation.prototype, 'save');
      //successful
      mongooseSaveStub.yields(null, fakeDonation);
      //mongoose save fail
      mongooseSaveStub.onCall(1).yields(true, fakeDonation); //not sure if on a failed save mongoose returns the donation to the callback function or if it does undefined.
      done();
    });

    it('saveDonation - SUCCESS', function(done){
      donationFunctions.createDonation(testVar.donationInformation, testVar.tripInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.report.success.status);
        expect(message).to.equal(donationCodes.report.success.message);
        // expect(donation._id).to.equal(testVar.donationInformation._id);
      });

      done();
    }); 

    it('saveDonation - FAILURE 400, mongoose save error', function(done){
      donationFunctions.createDonation(testVar.donationInformation, testVar.tripInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.report.addDonationFail.status);
        expect(message).to.equal(donationCodes.report.addDonationFail.message);
        // cant really check the donation is right, since we are creating a new donation, with a new id.
        // expect(donation._id).to.equal(testVar.donationInformation._id);  
      });

      done();
    }); 

    after(function(done) {
      sandbox.restore();
      done();
    });
  }); 



  describe('Delete Donation Test', function() {

    before(function(done) {
      var fakeDonation = new Donation(testVar.donationInformation);
      var mongooseDeleteStub = sandbox.stub(mongoose.Model, 'findOneAndDelete');
      //successful
      mongooseDeleteStub.yields(null, fakeDonation);
      
      //mongoose find fail
      mongooseDeleteStub.onCall(1).yields(true, null);

      //mongoose delete fail
      mongooseDeleteStub.onCall(2).yields(true, fakeDonation);
      done();
    });

    it('deleteDonation - SUCCESS', function(done){
      donationFunctions.deleteDonation(testVar.donationInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.deleteDonation.success.status);
        expect(message).to.equal(donationCodes.deleteDonation.success.message);
        // expect(donation._id).to.equal(testVar.donationInformation._id);
      });

      done();
    }); 

    it('deleteDonation - FAILURE 404, donation not found', function(done){
      donationFunctions.deleteDonation(testVar.donationInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.deleteDonation.donationNotFound.status);
        expect(message).to.equal(donationCodes.deleteDonation.donationNotFound.message);
      })
      done();
    });

    it('deleteDonation - FAILURE 400, deletion failed', function(done){
      donationFunctions.deleteDonation(testVar.donationInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.deleteDonation.deleteDonationFail.status);
        expect(message).to.equal(donationCodes.deleteDonation.deleteDonationFail.message);
      })
      done();
    });

    after(function(done) {
      sandbox.restore();
      done();
    });
  });
});