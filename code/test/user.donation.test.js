const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

/*
  These will be included on a case-by-case basis
*/
const app = require('../app'); // used for supertest
const donationCodes = require('../config/resCodes/user/donation');
const testVar = require('../config/testVar'); // generic test donation
const Donation = require('../models/donation');

const donationFunctions = require('../routers/user/donation');

describe('Donation functions', function() {
  
  describe('Create Donation Test', function() {

    before(function(done) {

      /*
        Create any stubs or variables you need for the tests
      
        example stub:
        var functionStub = sandbox.stub([object to stub], [function to stub])
        functionStub.yields - used to insert values into callback function 
        functionStub.onCall(n).yields - onCall is used to change the behavior of the stub the nth time the functon is called ( see admin.test.js )
        functionStub.withArgs([args]).yields - withArgs is uesed to cahnge the bahvior of the stub when called with specific arguments ( see user.models.test.js )
      */


      var fakeDonation = new Donation(testVar.donationInformation);
      var mongooseSaveStub = sandbox.stub(Donation.prototype, 'save');
      mongooseSaveStub.yields(null, fakeDonation);
      mongooseSaveStub.onCall(1).yields(true, null);
      // mongooseSaveStub.onCall(2).yields(true, null);
      done();
    });

    //  Note there is a beforeEach function that is called before each test and not only at the start

    /*
      it - indavidual test
      This is used to test different expected behaviors of a function

      The way our tests are structured there are two types of tests:
        - SUCCESS
        - FAILURE 
      There should be a test created for each of the different ways the function can succeed or fail.
      When there are multiple ways it can succeed or fail add a small desciption in the it name.
    */
    it('saveDonation - SUCCESS', function(done){

      /*
        1. any setup that wasn't handled in before or beforeEach
        2. Call functions and record output
        3. check if the output is what you expected
          expect([output]).to.equal([expected output]) - check chai documentation for other asserts
      */

      donationFunctions.createDonation(testVar.donationInformation, testVar.tripInfo._id, function(err, res){
        statusCode = res.statusCode;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.report.success.status);
        expect(message).to.equal(donationCodes.report.success.message);
      });

      done();
    }); 

    it('saveDonation - FAILURE 400, mongoose save error', function(done){
      donationFunctions.createDonation(testVar.donationInformation, testVar.tripInfo._id, function(err, res){
        statusCode = res.statusCode;
        message = res.message;
        expect(statusCode).to.equal(donationCodes.report.addDonationFail.status);
        expect(message).to.equal(donationCodes.report.addDonationFail.message);
      });

      done();
    }); 

    /*
      after is called at the end of a set of unit tests to clean up the testing environemnt
    */
    after(function(done) {
      
      /*
        This is where you restore all stubs created and delete any variables that need to be deleted

        If you did create a stub you will need to run:
        sandbox.restore();
      */
      sandbox.restore();
      done();
    });

    //  Note there is an afterEach function that is called after each test and not only at the end

  }); 

});