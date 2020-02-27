
const expect = require('chai').expect;
const mongoose = require('mongoose');
const passport = require('passport');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../app');
const tripCode = require('../config/resCodes').trip;
const testVar = require('../config/testVar');
const Trip = require('../models/trip');
const User = require('../models/user');

describe('User Trip Routers', function() {

  describe('report trip', function(){
    
    before(function(done) {

      //TODO: When location added create stub for location lookup/creation

      //TODO When donation added create stub for donation creation

      // When it comes time to implement unit test for these in this test I (thomas) can do this. This test is kinda messy and I might try to refactor it

      var fakeTrip = new Trip(testVar.tripInfo);

      var withTripIDs = JSON.parse(JSON.stringify(testVar.userInfo)); 
      withTripIDs.tripIDs = [testVar.filler];
      var fakeUser = new User(withTripIDs);
      var fakeUserNoTripIDs = new User(testVar.userInfo);

      var saveTripDBStub = sandbox.stub(mongoose.models.Trip.prototype, 'save')
      saveTripDBStub.yields(null, fakeTrip);
      saveTripDBStub.onCall(1).yields(null, fakeUserNoTripIDs);
      saveTripDBStub.onCall(2).yields(true, null);

      var findUser = sandbox.stub(mongoose.Model, 'findById');
      findUser.yields(null,  fakeUser);
      findUser.onCall(2).yields(true, null);
      findUser.onCall(3).yields(null, null);

      var saveUserDBStub = sandbox.stub(mongoose.models.User.prototype, 'save')
      saveUserDBStub.yields(null, fakeUser);
      saveUserDBStub.onCall(2).yields(true, null);

      done();
    });

    it('report trip SUCCESS', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.report.success.status);
          expect(message).to.equal(tripCode.report.success.message)
        });
      done();

    });

    it('report trip SUCCESS - user with no preivous trips', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.report.success.status);
          expect(message).to.equal(tripCode.report.success.message)
        });
      done();

    });

    it('report trip FAILURE - add trip fail', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.report.addTripFail.status);
          expect(message).to.equal(tripCode.report.addTripFail.message)
        });
      done();

    });

    it('report trip FAILURE - user not found (err)', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.report.userNotFound.status);
          expect(message).to.equal(tripCode.report.userNotFound.message)
        });
      done();

    });

    it('report trip FAILURE - user not found (user == null)', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.report.userNotFound.status);
          expect(message).to.equal(tripCode.report.userNotFound.message)
        });
      done();

    });

    it('report trip FAILURE - user update fail', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.report.userUpdateFail.status);
          expect(message).to.equal(tripCode.report.userUpdateFail.message)
        });
      done();

    });

    after(function(done){
      sandbox.restore();
      done();
    });

  });

  describe('toggle trip privacy', function() {
    
    before (function(done) {

      var fakeTrip = new Trip(testVar.tripInfo);

      var findTrip = sandbox.stub(mongoose.Model, 'findById');
      findTrip.yields(null,  fakeTrip);
      findTrip.onCall(1).yields(true, null);
      findTrip.onCall(2).yields(null, null);

      var saveDBStub = sandbox.stub(Trip.prototype, 'save')
      saveDBStub.yields(null, fakeTrip);
      saveDBStub.onCall(1).yields(true, null);

      done();
    });

    it('toggle privacy SUCCESS', function(done) {
      request(app)
        .post('/api/user/trip/toggle-privacy')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.togglePrivacy.success.status);
          expect(message).to.equal(tripCode.togglePrivacy.success.message)
        });
      done();
    });

    it('toggle privacy FAILURE - trip not found (err)', function(done) {
      request(app)
        .post('/api/user/trip/toggle-privacy')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.togglePrivacy.tripNotFound.status);
          expect(message).to.equal(tripCode.togglePrivacy.tripNotFound.message)
        });
      done();
    });

    it('toggle privacy FAILURE - trip not found (trip == null)', function(done) {
      request(app)
        .post('/api/user/trip/toggle-privacy')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.togglePrivacy.tripNotFound.status);
          expect(message).to.equal(tripCode.togglePrivacy.tripNotFound.message)
        });
      done();
    });

    it('toggle privacy FAILURE - trip update fail', function(done) {
      request(app)
        .post('/api/user/trip/toggle-privacy')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.togglePrivacy.tripUpdateFail.status);
          expect(message).to.equal(tripCode.togglePrivacy.tripUpdateFail.message)
        });
      done();
    });

    after( function(done) {
      sandbox.restore();
      done();
    });
  
  });

  describe('delete trip', function() {

    before( function(done) {
      var countDBStub = sandbox.stub(mongoose.Model, 'count');
      countDBStub.yields(null, 1);
      countDBStub.onCall(1).yields(true, null);
      countDBStub.onCall(2).yields(null, 0);

      var deleteOneDBStub = sandbox.stub(mongoose.Model, 'deleteOne');
      deleteOneDBStub.yields(null);
      deleteOneDBStub.onCall(1).yields(true);

      done();
    });

    it('delete trip SUCCESS', function(done) {
      request(app)
        .post('/api/user/trip/delete-trip')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.deleteTrip.success.status);
          expect(message).to.equal(tripCode.deleteTrip.success.message)
        });
      done();
    });

    it('delete trip FAILURE - check trip exist fail', function(done) {
      request(app)
        .post('/api/user/trip/delete-trip')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.deleteTrip.checkTripExistFail.status);
          expect(message).to.equal(tripCode.deleteTrip.checkTripExistFail.message)
        });
      done();
    });

    it('delete trip FAILURE - trip not found', function(done) {
      request(app)
        .post('/api/user/trip/delete-trip')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.deleteTrip.tripNotFound.status);
          expect(message).to.equal(tripCode.deleteTrip.tripNotFound.message)
        });
      done();
    });

    it('delete trip FAILURE - delete trip failed', function(done) {
      request(app)
        .post('/api/user/trip/delete-trip')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(tripCode.deleteTrip.deleteTripFail.status);
          expect(message).to.equal(tripCode.deleteTrip.deleteTripFail.message)
        });
      done();
    });

    after( function(done) {
      sandbox.restore();
      done();
    });
  });

  describe('get trips', function() {

    before( function(done) {

      var withTripIDs = JSON.parse(JSON.stringify(testVar.userInfo)); 
      withTripIDs.tripIDs = [testVar.filler];

      var findUserDBStump = sandbox.stub(mongoose.Model, 'findById');
      findUserDBStump.yields(null, testVar.userInfo);
      findUserDBStump.onCall(1).yields(null, withTripIDs);
      findUserDBStump.onCall(2).yields(true, null);
      findUserDBStump.onCall(3).yields(true, null);
      findUserDBStump.onCall(4).yields(null, withTripIDs);

      var findTripsDBStump = sandbox.stub(mongoose.Model, 'find');
      findTripsDBStump.yields(null, ['trip']);
      findTripsDBStump.onCall(1).yields(true, null);

      done();
    });

    it('get trips SUCCESS - no tripIDs', function(done) {
      request(app)
        .get('/api/user/trip/trips')
        .query({_id:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.trips.success.status);
        });

      done();
    });

    it('get trips SUCCESS - with tripIDs', function(done) {

      request(app)
        .get('/api/user/trip/trips')
        .query({_id:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.trips.success.status);
        });

      done();
    });

    it('get trips FAILTURE - user not found (err)', function(done) {
      request(app)
        .get('/api/user/trip/trips')
        .query({_id:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.trips.userNotFound.status);
        });

      done();
    });

    it('get trips FAILTURE - user not found (user == null)', function(done) {
      request(app)
        .get('/api/user/trip/trips')
        .query({_id:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.trips.userNotFound.status);
        });

      done();
    });

    it('get trips FAILTURE - trips not found', function(done) {
      request(app)
        .get('/api/user/trip/trips')
        .query({_id:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.trips.tripsNotFound.status);
        });

      done();
    });
    
    after( function(done) {
      sandbox.restore();
      done();
    });

  });
});
