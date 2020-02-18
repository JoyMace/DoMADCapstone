
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

  /*
    Uses Supertest package to test login API requests
  */
  describe('login', function() {

    var stub;
    var callCount;
    
    /*
      Creates stub of passport's authenticate function
      which is in charge of logging the user in
    */
    before(function(done) {
      stub = sandbox.stub(passport, 'authenticate').returns((req, res, next) => next());
      callCount = 0
      done();
    });

    beforeEach(function(done) {
      /*
        This is a bit janky but I have spent a few hours trying 
        to solve this testing problem and this is them best 
        solution I could get to work

        On each iteration autheticate's return values are set
        and callCount increments for the next test
      */
      switch(callCount) {
        case 1:
          // wrong username
          stub.yields(resCode.login.wrongUsername, null);
          break;
        case 2:
          // wrong password
          stub.yields(resCode.login.wrongPassword, null);
          break;
        default:
          // success and other
          var fakeUser = new User(testVar.userInfo);
          stub.yields(null, fakeUser);
      }
      callCount++;

      done();
    });

    after( function(done) {
      sandbox.restore();
      done()
    });

    it('login SUCCESS', function(done) {
      request(app)
        .post('/api/user/login')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
        statusCode = res.statusCode;
        message = JSON.parse(res.res.text).message
        expect(statusCode).to.equal(resCode.login.success.status);
        expect(message).to.equal(resCode.login.success.message)
        });
      done(); 
    });

    it('login FAILURE - wrong username', function(done) {
      request(app)
        .post('/api/user/login')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
        statusCode = res.statusCode;
        message = JSON.parse(res.res.text).message
        expect(statusCode).to.equal(resCode.login.wrongUsername.status);
        expect(message).to.equal(resCode.login.wrongUsername.message)
        });
      done(); 
    });

    it('login FAILURE - wrong password', function(done) {
      request(app)
        .post('/api/user/login')
        .send(testVar.userInfo)
        .type('form')
        .end(function(err, res){
        statusCode = res.statusCode;
        message = JSON.parse(res.res.text).message
        expect(statusCode).to.equal(resCode.login.wrongPassword.status);
        expect(message).to.equal(resCode.login.wrongPassword.message)
        });
      done(); 
    });

  });

  /*
    Uses Supertest package to test signup API requests
  */
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


