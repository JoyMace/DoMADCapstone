const expect = require('chai').expect;
const mongoose = require('mongoose');
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

  describe('ban user', function(){
    
    before(function(done){

      var findOneAndUpdateStub = sandbox.stub(mongoose.Model, 'findOneAndUpdate');
      findOneAndUpdateStub.yields(null, true);
      findOneAndUpdateStub.onCall(1).yields(true, null);
      findOneAndUpdateStub.onCall(2).yields(null, null);

      done();
    });

    it('ban user SUCCESS', function(done){

      request(app)
        .put('/api/admin/ban-user')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.banUser.success.message)
          expect(statusCode).to.equal(adminCodes.banUser.success.status);
        });

      done();
    });

    it('ban user FAILURE - missing user info', function(done){

      request(app)
        .put('/api/admin/ban-user')
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.banUser.missingInfo.message)
          expect(statusCode).to.equal(adminCodes.banUser.missingInfo.status);
        });

      done();
    });


    it('ban user FAILURE - update fail', function(done){

      request(app)
        .put('/api/admin/ban-user')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.banUser.updateFail.message)
          expect(statusCode).to.equal(adminCodes.banUser.updateFail.status);
        });

      done();
    });

    it('ban user FAILURE - user not found', function(done){

      request(app)
        .put('/api/admin/ban-user')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.banUser.userNotFound.message)
          expect(statusCode).to.equal(adminCodes.banUser.userNotFound.status);
        });

      done();
    });

    after(function(done){

      sandbox.restore();
      done();

    });

  });

  describe('unban user', function(){
    
    before(function(done){

      var findOneAndUpdateStub = sandbox.stub(mongoose.Model, 'findOneAndUpdate');
      findOneAndUpdateStub.yields(null, true);
      findOneAndUpdateStub.onCall(1).yields(true, null);
      findOneAndUpdateStub.onCall(2).yields(null, null);

      done();
    });

    it('unban user SUCCESS', function(done){

      request(app)
        .put('/api/admin/unban-user')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.unbanUser.success.message)
          expect(statusCode).to.equal(adminCodes.unbanUser.success.status);
        });

      done();
    });

    it('unban user FAILURE - missing user info', function(done){

      request(app)
        .put('/api/admin/unban-user')
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.unbanUser.missingInfo.message)
          expect(statusCode).to.equal(adminCodes.unbanUser.missingInfo.status);
        });

      done();
    });


    it('unban user FAILURE - update fail', function(done){

      request(app)
        .put('/api/admin/unban-user')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.unbanUser.updateFail.message)
          expect(statusCode).to.equal(adminCodes.unbanUser.updateFail.status);
        });

      done();
    });

    it('unban user FAILURE - user not found', function(done){

      request(app)
        .put('/api/admin/unban-user')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(message).to.equal(adminCodes.unbanUser.userNotFound.message)
          expect(statusCode).to.equal(adminCodes.unbanUser.userNotFound.status);
        });

      done();
    });

    after(function(done){

      sandbox.restore();
      done();

    });

  });
});
