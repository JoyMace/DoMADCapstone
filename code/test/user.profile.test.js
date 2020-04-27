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


// TODO: Doantion count test


describe('[ User profile APIs ]', function() {

  describe('[ Get profile ]', function() {

    before(function(done) {

      var fakeUser = new User(testVar.userInfo);
      var findProfileDBStub = sandbox.stub(mongoose.Model, 'findById');
      findProfileDBStub.yields(null, fakeUser);
      findProfileDBStub.onCall(1).yields(null, fakeUser);
      //findProfileDBStub.onCall(2).yields(null, fakeUser);
      findProfileDBStub.onCall(2).yields(true, null);


      var oneTrip = new Trip(testVar.tripInfo)
      var secondTrip = new Trip(testVar.tripInfo)
      var fakeTrips = [oneTrip, secondTrip]

      var tripCountDBStub = sandbox.stub(Trip, 'aggregate');
      tripCountDBStub.yields(null, fakeTrips);
      tripCountDBStub.onCall(1).yields(null, fakeTrips);
      tripCountDBStub.onCall(2).yields(true, null);



      // var oneDonation = new Donation(testVar.donationInformation);
      // var secondDonation = new Donation(testVar.donationInformation);
      // var fakeDonations = [oneDonation,secondDonation]
      //
      // var donationCountDBStub = sandbox.stub(Donation, 'aggregate');
      // donationCountDBStub.yields(null, fakeDonations);
      // donationCountDBStub.onCall(1).yields(true, null);

      done();

    });


    it('get profile FAILTURE - user not given', function(done) {
      request(app)
        .get('/api/user/profile/profile')
        .type('form')
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(profileCodes.profile.userNotGiven.status);
          expect(message).to.equal(profileCodes.profile.userNotGiven.message);
        });

      done();
    });


    it('get user profile SUCCESS', function(done) {
      var fakeUser = JSON.parse(JSON.stringify(new User(testVar.userInfo)));

      request(app)
        .get('/api/user/profile/profile')
        .type('form')
        .query(fakeUser)
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(profileCodes.profile.success.status);
        });
      done();
    });

    it('get profile FAILTURE - trip count not found', function(done) {
      var fakeUser = JSON.parse(JSON.stringify(new User(testVar.userInfo)));

      request(app)
        .get('/api/user/profile/profile')
        .type('form')
        .query(fakeUser)
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(profileCodes.profile.tripcountNotFound.message);
          expect(statusCode).to.equal(profileCodes.profile.tripcountNotFound.status);
        });

      done();
    });

    // it('get profile FAILTURE - donation count not found', function(done) {
    //   var fakeUser = JSON.parse(JSON.stringify(new User(testVar.userInfo)));
    //
    //   request(app)
    //     .get('/api/user/profile/profile')
    //     .type('form')
    //     .query(fakeUser)
    //     .then(function(res) {
    //       statusCode = res.statusCode;
    //       message = JSON.parse(res.res.text).message
    //       expect(message).to.equal(profileCodes.profile.donationcountNotFound.message);
    //       expect(statusCode).to.equal(profileCodes.profile.donationcountNotFound.status);
    //     });
    //
    //   done();
    // });




    it('get profile FAILTURE - profile not found', function(done) {
      var fakeUser = JSON.parse(JSON.stringify(new User(testVar.userInfo)));

      request(app)
        .get('/api/user/profile/profile')
        .type('form')
        .query(fakeUser)
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(profileCodes.profile.profileNotFound.message);
          expect(statusCode).to.equal(profileCodes.profile.profileNotFound.status);
        });

      done();
    });


    after( function(done) {
      sandbox.restore();
      done();
    });

  });

});
