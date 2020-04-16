const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();


const app = require('../app');
const profileCodes = require('../config/resCodes').profile;
const testVar = require('../config/testVar');
const User = require('../models/user');
const Trip = require('../models/trip');
const Donation = require('../models/donation');


describe('[ User profile APIs ]', function() {

  describe('[ Get profile ]', function() {

    /*
      before is called at the start of each set of tests to set up the testing environment
    */
    before(function(done) {

      // var findProfile = sandbox.stub(mongoose.Model, 'find');
      // findProfile.yields(null, 1);
      // findProfile.onCall(1).yields(true, null);
      // findProfile.onCall(2).yields(null, 0);
      //
      // var deleteOneDBStub = sandbox.stub(mongoose.Model, 'countTrip');
      // deleteOneDBStub.yields(null);
      // deleteOneDBStub.onCall(1).yields(true);
      //
      // var deleteOneDBStub = sandbox.stub(mongoose.Model, 'countDonation');
      // deleteOneDBStub.yields(null);
      // deleteOneDBStub.onCall(1).yields(true);

      done();

    });


    it('get user profile', function(done) {
      request(app)
        .get('/api/user/profile/profile')
        .query({userID:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(profileCodes.profile.success.status);
        });
      done();
    });


    it('get profile FAILTURE - profile not found', function(done) {
      request(app)
        .get('/api/user/profile/profile')
        .query({userID:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(profileCodes.profile.profileNotFound.message);
          expect(statusCode).to.equal(profileCodes.profile.profileNotFound.status);
        });

      done();
    });


    it('get profile FAILTURE - trip count not found', function(done) {
      request(app)
        .get('/api/user/profile/profile')
        .query({userID:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(profileCodes.profile.tripcountNotFound.message);
          expect(statusCode).to.equal(profileCodes.profile.tripcountNotFound.status);
        });

      done();
    });


    it('get profile FAILTURE - donation count not found', function(done) {
      request(app)
        .get('/api/user/profile/profile')
        .query({userID:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(profileCodes.profile.donationcountNotFound.message);
          expect(statusCode).to.equal(profileCodes.profile.donationcountNotFound.status);
        });

      done();
    });


    /*
      after is called at the end of a set of unit tests to clean up the testing environemnt
    */
    after( function(done) {
      sandbox.restore();
      done();
    });

    //  Note there is an afterEach function that is called after each test and not only at the end

  });

});
