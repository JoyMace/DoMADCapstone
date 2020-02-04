
const expect = require('chai').expect;
const mongoose = require('mongoose');
const passport = require('passport');
const request = require('supertest');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../app');
const resCode = require('../config/resCode');
const testVar = require('../config/testVar');
const User = require('../models/user');


describe('User Routes', function() {

  describe('login', function() {

    // This is actually calling passport instead of using a stub
    it('login SUCCESS', function(done) {
       request(app)
        .post('/api/user/login')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          var loc = res.headers.location
          expect(loc).to.equal('/success');
        });
      done(); 
    });

  });

  describe('signup', function() {

    // used for user already exists
   var usernameExists = 'exists'; 

    before(function () {

        var userQuery = {$or: [
          {username: usernameExists},
          {email: usernameExists}
        ]}

        var findOneDBStub = sandbox.stub(mongoose.Model, 'findOne');
        findOneDBStub.withArgs(userQuery).yields(null, true);
        findOneDBStub.yields(null, null);

        var saveDBStub = sandbox.stub(User.prototype, 'save')
        saveDBStub.yields(null, null);
        // make sure this corresponds with failed to add user
        saveDBStub.onCall(1).yields(true, null);
    });

    it('Signup SUCCESS', function(done) {
      request(app)
        .post('/api/user/signup')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.res.text).message
          expect(statusCode).to.equal(resCode.signup.success.status);
          expect(message).to.equal(resCode.signup.success.message)
        });
      done(); 
    });

    it('Signup FAILURE - failed to add user', function (done) {
      request(app)
        .post('/api/user/signup')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.text).message;
          expect(statusCode).to.equal(resCode.signup.failedToAdd.status);
          expect(message).to.equal(resCode.signup.failedToAdd.message);
        });
      done();
    });

    it('Signup FAILURE - fill required fields', function (done) {
      lessFields = JSON.parse(JSON.stringify(testVar.userInfo));
      delete lessFields.email;

      request(app)
        .post('/api/user/signup')
        .send(lessFields)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.text).message;
          expect(statusCode).to.equal(resCode.signup.missingFields.status);
          expect(message).to.equal(resCode.signup.missingFields.message);
        });
      done();
    });

    it('Signup FAILURE - verify password', function (done) {
      missMatchedPass = JSON.parse(JSON.stringify(testVar.userInfo));
      missMatchedPass.verifyPassword = testVar.badPassword;

      request(app)
        .post('/api/user/signup')
        .send(missMatchedPass)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.text).message;
          expect(statusCode).to.equal(resCode.signup.verifyPassword.status);
          expect(message).to.equal(resCode.signup.verifyPassword.message);
        });
      done();
    });

    it('Signup FAILURE - password requirements', function (done) {


      badPassword = JSON.parse(JSON.stringify(testVar.userInfo));
      badPassword.password = testVar.badPassword;
      badPassword.verifyPassword = testVar.badPassword;

      request(app)
        .post('/api/user/signup')
        .send(badPassword)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.text).message;
          expect(statusCode).to.equal(resCode.signup.passwordReq.status);
          expect(message).to.equal(resCode.signup.passwordReq.message);
        });
      done();
    });

    it('Signup FAILURE - password requirements', function (done) {
      badPassword = JSON.parse(JSON.stringify(testVar.userInfo));
      badPassword.password = testVar.badPassword;
      badPassword.verifyPassword = testVar.badPassword;

      request(app)
        .post('/api/user/signup')
        .send(badPassword)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.text).message;
          expect(statusCode).to.equal(resCode.signup.passwordReq.status);
          expect(message).to.equal(resCode.signup.passwordReq.message);
        });
      done();
    });

    it('Signup FAILURE - user already exists', function (done) {
      userExists = JSON.parse(JSON.stringify(testVar.userInfo));
      userExists.username = usernameExists;

      request(app)
        .post('/api/user/signup')
        .send(userExists)
        .type('form')
        .end(function(err, res){
          statusCode = res.statusCode;
          message = JSON.parse(res.text).message;
          expect(statusCode).to.equal(resCode.signup.userExists.status);
          expect(message).to.equal(resCode.signup.userExists.message);
        });
      done();
    });

    after( function() {
      sandbox.restore();
    });
  });
});


