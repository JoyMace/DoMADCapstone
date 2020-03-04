const expect = require('chai').expect;
const mongoose = require('mongoose');
const passport = require('passport');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../app');
const adminCodes = require('../config/resCodes').admin;
const testVar = require('../config/testVar');
const Trip = require('../models/trip');

describe('Admin Routers', function() {
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
        .post('/api/admin/toggle-hide')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.toggleHide.success.message)
          expect(statusCode).to.equal(adminCodes.toggleHide.success.status);
        });
      done();
    });

    it('toggle privacy FAILURE - trip not found (err)', function(done) {
      request(app)
        .post('/api/admin/toggle-hide')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.toggleHide.tripNotFound.message)
          expect(statusCode).to.equal(adminCodes.toggleHide.tripNotFound.status);
        });
      done();
    });

    it('toggle privacy FAILURE - trip not found (trip == null)', function(done) {
      request(app)
        .post('/api/admin/toggle-hide')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.toggleHide.tripNotFound.message)
          expect(statusCode).to.equal(adminCodes.toggleHide.tripNotFound.status);
        });
      done();
    });

    it('toggle privacy FAILURE - trip update fail', function(done) {
      request(app)
        .post('/api/admin/toggle-hide')
        .send(testVar.tripInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.toggleHide.tripUpdateFail.message)
          expect(statusCode).to.equal(adminCodes.toggleHide.tripUpdateFail.status);
        });
      done();
    });

    after( function(done) {
      sandbox.restore();
      done();
    });
  
  });
});
