
const expect = require('chai').expect;
const sinon = require('sinon');

const app = require('../app');
const User = require('../models/user');
const testVar = require('../config/testVar');

const crypto = require('crypto');

describe('User Schema', function() {

  describe('User Methods', function() {

    // setup
    let testUser;

    before(function () {
      let cryptoStub = sinon.stub(crypto, 'pbkdf2Sync');
      cryptoStub.withArgs(testVar.wrongVal).returns(testVar.wrongVal);
      cryptoStub.returns(testVar.password);
    });


    beforeEach(function () {
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

  });
  
  /*it('test', function() {
    userInfo = { username: 'bom', password: 'Password' };

    request(app)
      .post('/api/user/login', userInfo)
      .end(function(err, res){
        console.log(res);
      });
  });*/

});
