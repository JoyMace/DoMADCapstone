
const crypto = require('crypto');
const expect = require('chai').expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const app = require('../app');
const testVar = require('../config/testVar');
const User = require('../models/user');


describe('User Schema', function() {

  describe('User Methods', function() {

    // setup
    var testUser;

    before( function() {
      var cryptoStub = sandbox.stub(crypto, 'pbkdf2Sync');
      cryptoStub.withArgs(testVar.wrongVal).returns(testVar.wrongVal);
      cryptoStub.returns(testVar.password);
    });


    beforeEach( function() {
        testUser = new User();

        testUser.username = testVar.filler;
        testUser.firstName = testVar.filler;
        testUser.lastName = testVar.filler;
        testUser.email = testVar.filler;
    });

    // tests
    it('setPassword', function(done) {

      testUser.setPassword(testVar.password);
      expect(testUser.hash).to.equal(testVar.password);
      done()

    }); 

    it('validatePassword SUCCESS', function(done) {

      testUser.setPassword(testVar.password);
      expect(testUser.hash).to.equal(testVar.password);

      let passwordValid = testUser.validatePassword(testVar.password);
      expect(passwordValid).to.equal(true);

      done()
    }); 

    it('validatePassword FAILURE', function(done) {

      testUser.setPassword(testVar.password);
      expect(testUser.hash).to.equal(testVar.password);

      let passwordValid = testUser.validatePassword(testVar.wrongVal);
      expect(passwordValid).to.equal(false);

      done()
    }); 

    after( function() {
      sandbox.restore();
    });

  });
  
});
