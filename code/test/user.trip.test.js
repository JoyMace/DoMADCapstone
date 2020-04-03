
const expect = require('chai').expect;
const mongoose = require('mongoose');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../app');
const tripCode = require('../config/resCodes').trip;
const testVar = require('../config/testVar');
const Trip = require('../models/trip');
const User = require('../models/user');
const Location = require('../models/location');

describe('User Trip Routers', function() {

  describe('report trip', function(){
    
    before(function(done) {

      //TODO When donation added create stub for donation creation

      // When it comes time to implement unit test for these in this test I (thomas) can do this. This test is kinda messy and I might try to refactor it

      var fakeTrip = new Trip(testVar.tripInfo);

      var saveTripDBStub = sandbox.stub(Trip.prototype, 'save')
      saveTripDBStub.yields(null, fakeTrip);
      saveTripDBStub.onCall(1).yields(true, null);

      var fakeLocation = new Location(testVar.locationInfo);

      var locationStub = sandbox.stub(Location, 'findOneOrCreate');
      locationStub.yields(null, fakeLocation);

      done();
    });

    it('report trip SUCCESS', function(done) {
      var trip = JSON.parse(JSON.stringify(testVar.tripInfo)); 

      request(app)
        .post('/api/user/trip/report')
        .send(trip)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.report.success.message)
          expect(statusCode).to.equal(tripCode.report.success.status);
        });
      done();

    });

    it('report trip FAILURE - bad words found', function(done) {
      var trip = JSON.parse(JSON.stringify(testVar.tripInfo)); 
      trip.notes = 'ass';

      request(app)
        .post('/api/user/trip/report')
        .send(trip)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.report.badWordsFound.message)
          expect(statusCode).to.equal(tripCode.report.badWordsFound.status);
        });
      done();

    });

    it('report trip FAILURE - no user given', function(done) {

      request(app)
        .post('/api/user/trip/report')
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.report.userNotGiven.message)
          expect(statusCode).to.equal(tripCode.report.userNotGiven.status);
        });
      done();

    });

    it('report trip FAILURE - add trip fail', function(done) {
      var trip = JSON.parse(JSON.stringify(testVar.tripInfo)); 

      request(app)
        .post('/api/user/trip/report')
        .send(trip)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.report.addTripFail.message)
          expect(statusCode).to.equal(tripCode.report.addTripFail.status);
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
          expect(message).to.equal(tripCode.togglePrivacy.success.message)
          expect(statusCode).to.equal(tripCode.togglePrivacy.success.status);
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
          expect(message).to.equal(tripCode.togglePrivacy.tripNotFound.message)
          expect(statusCode).to.equal(tripCode.togglePrivacy.tripNotFound.status);
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
          expect(message).to.equal(tripCode.togglePrivacy.tripNotFound.message)
          expect(statusCode).to.equal(tripCode.togglePrivacy.tripNotFound.status);
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
          expect(message).to.equal(tripCode.togglePrivacy.tripUpdateFail.message)
          expect(statusCode).to.equal(tripCode.togglePrivacy.tripUpdateFail.status);
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
        .post('/api/user/trip/delete')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.deleteTrip.success.message)
          expect(statusCode).to.equal(tripCode.deleteTrip.success.status);
        });
      done();
    });

    it('delete trip FAILURE - check trip exist fail', function(done) {
      request(app)
        .post('/api/user/trip/delete')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.deleteTrip.checkTripExistFail.message)
          expect(statusCode).to.equal(tripCode.deleteTrip.checkTripExistFail.status);
        });
      done();
    });

    it('delete trip FAILURE - trip not found', function(done) {
      request(app)
        .post('/api/user/trip/delete')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.deleteTrip.tripNotFound.message)
          expect(statusCode).to.equal(tripCode.deleteTrip.tripNotFound.status);
        });
      done();
    });

    it('delete trip FAILURE - delete trip failed', function(done) {
      request(app)
        .post('/api/user/trip/delete')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.deleteTrip.deleteTripFail.message)
          expect(statusCode).to.equal(tripCode.deleteTrip.deleteTripFail.status);
        });
      done();
    });

    after( function(done) {
      sandbox.restore();
      done();
    });
  });

  describe('get trips', function() {

    var checkSkip = () => {};
    var checkLimit = () => {};

    before( function(done) {

      var mockFind = {
        skip: function (offset) {
          checkSkip(offset);
          return this;
        },
        populate: function(query) {
          return this; 
        },
        limit: function (limit) {
          checkLimit(limit);
          return this;
        },
        sort: function (query) {
          return this;
        },
        exec: function (callback) {
          callback(null, ['trip']);
        }
      };

      var mockFindFail = { ...mockFind };
      mockFindFail['exec'] = function(callback) { callback(true, null); }
  
      var findTripsDBStump = sandbox.stub(mongoose.Model, 'find');
      findTripsDBStump.returns(mockFind);
      findTripsDBStump.onCall(2).returns(mockFindFail);
  
      done();
    });

    it('get all trips SUCCESS', function(done) {
      request(app)
        .get('/api/user/trip/all-trips')
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.allTrips.success.status);
        });
      done();
    });

    it('get all trips SUCCESS - with extra parameters', function(done) {

      var testLimit = 20;
      var testOffset = 30;

      query = {
          'onlyPublic': true,
          'limit': testLimit,
          'offset': testOffset
        }

      var actualLimit = -1;  
      checkLimit = function(limit){
        actualLimit = limit;
      }

      var actualOffset = -1;
      checkSkip = function(offset){
        actualOffset = offset;
      }

      request(app)
        .get('/api/user/trip/all-trips')
        .query(query)
        .then(function(res) {
          statusCode = res.statusCode;
          expect(actualLimit).to.equal(testLimit);
          expect(actualOffset).to.equal(testOffset);
          expect(statusCode).to.equal(tripCode.allTrips.success.status);
        });
      done();
    });

    it('get trips FAILTURE - user not given', function(done) {
      request(app)
        .get('/api/user/trip/user-trips')
        .then(function(res) {
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(tripCode.userTrips.userNotGiven.message);
          expect(statusCode).to.equal(tripCode.userTrips.userNotGiven.status);
        });

      done();
    });

    it('get all trips FAILURE - trips not found', function(done) {
      request(app)
        .get('/api/user/trip/all-trips')
        .query({userID:testVar._id})
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.allTrips.tripsNotFound.status);
        });
      done();
    });

    after( function(done) {
      sandbox.restore();
      done();
    });
  });

  describe('get all trips', function(){

    var checkSkip = () => {};
    var checkLimit = () => {};

    before( function(done) {

      var mockFind = {
        skip: function (offset) {
          checkSkip(offset);
          return this;
        },
        populate: function(query) {
          return this; 
        },
        limit: function (limit) {
          checkLimit(limit);
          return this;
        },
        sort: function (query) {
          return this;
        },
        exec: function (callback) {
          callback(null, ['trip']);
        }
      };

      var mockFindFail = { ...mockFind };
      mockFindFail['exec'] = function(callback) { callback(true, null); }
  
      var findTripsDBStump = sandbox.stub(mongoose.Model, 'find');
      findTripsDBStump.returns(mockFind);
      findTripsDBStump.onCall(2).returns(mockFindFail);

      done();
    });

    it('get all trips SUCCESS', function(done) {
      request(app)
        .get('/api/user/trip/all-trips')
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.allTrips.success.status);
        });
      done();
    });

    it('get all trips SUCCESS - with extra parameters', function(done) {

      var testLimit = 20;
      var testOffset = 30;

      query = {
          'onlyPublic': true,
          'limit': testLimit,
          'offset': testOffset
        }

      var actualLimit = -1;  
      checkLimit = function(limit){
        actualLimit = parseInt(limit);
      }

      var actualOffset = -1;
      checkSkip = function(offset){
        actualOffset = parseInt(offset);
      }

      request(app)
        .get('/api/user/trip/all-trips')
        .query(query)
        .then(function(res) {
          statusCode = res.statusCode;
          expect(actualLimit).to.equal(testLimit);
          expect(actualOffset).to.equal(testOffset);
          expect(statusCode).to.equal(tripCode.allTrips.success.status);
        });
      done();
    });

    it('get all trips FAILURE - trips not found', function(done) {
      request(app)
        .get('/api/user/trip/all-trips')
        .then(function(res) {
          statusCode = res.statusCode;
          expect(statusCode).to.equal(tripCode.allTrips.tripsNotFound.status);
        });
      done();
    });

    after( function(done) {
      sandbox.restore();
      done();
    });
  });
});
