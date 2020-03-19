const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const donationCodes = require('../config/resCodes/user/donation');
const testVar = require('../config/testVar');
const Donation = require('../models/donation');

const donationFunctions = require('../routers/user/donation');

describe('Donation functions', function() {
  
  describe('Create Donation Test', function() {

    before(function(done) {
      var fakeDonation = new Donation(testVar.donationInformation);
      var mongooseSaveStub = sandbox.stub(Donation.prototype, 'save');
      mongooseSaveStub.yields(null, fakeDonation);
      mongooseSaveStub.onCall(1).yields(true, fakeDonation); 
      done();
    });

    it('saveDonation - SUCCESS', function(done){
      donationFunctions.createDonation(testVar.donationInformation, testVar.tripInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.saveDonation.success.status);
        expect(message).to.equal(donationCodes.saveDonation.success.message);
      });

      done();
    }); 

    it('saveDonation - FAILURE 400, mongoose save error', function(done){
      donationFunctions.createDonation(testVar.donationInformation, testVar.tripInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.saveDonation.addDonationFail.status);
        expect(message).to.equal(donationCodes.saveDonation.addDonationFail.message);
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
      mongooseDeleteStub.yields(null, fakeDonation);
      mongooseDeleteStub.onCall(1).yields(true, null);
      mongooseDeleteStub.onCall(2).yields(true, fakeDonation);
      done();
    });

    it('deleteDonation - SUCCESS', function(done){
      donationFunctions.deleteDonation(testVar.donationInfo._id, function(err, donation, res){
        statusCode = res.status;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.deleteDonation.success.status);
        expect(message).to.equal(donationCodes.deleteDonation.success.message);
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