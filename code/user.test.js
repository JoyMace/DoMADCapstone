
const expect = require('chai').expect;
const request = require('request');
const proxyquire = require('proxyquire');


const User = require('../models/user');

const fs = require('fs');

describe('User', function(){
  describe('login', function(){

    before(function(){
      let newUser = new User();

      newUser.username = 'test';
      newUser.firstName = 'test';
      newUser.lastName = 'test';
      newUser.email = 'test';
      newUser.setPassword('Password');

      newUser.save(function(err, user_check) {
        if(err) { throw err; }
      });

      User.deleteMany({ username: 'TEST_WRONG' }, function (err) {
        if (err) { throw err; }
      });
    });
    
/*
    it('Successful Login', function(done){
      formData = {
        username: 'TEST',
        password: 'Password'
      }

      request.post({url:'http://localhost:5000/api/user/login', form: formData}, function(err, res, body){
        if (err) {throw err;}
        expect(res.statusCode).to.equal(302);
        expect(res.headers['location']).to.equal('/success');
      });
      done();
    });

    it('Incorrect Username', function(done){
      formData = {
        username: 'TEST_WRONG',
        password: 'Password'
      }

      request.post({url:'http://localhost:5000/api/user/login', form: formData}, function(err, res, body){
        //if (err) {throw err;}
        expect(res.statusCode).to.equal(302);
        console.log(res);
        fs.writeFile("/tmp/test", res, function(err) {
          if (err) { throw err; }
        });
        expect(res.headers['location']).to.equal('/failure');
      });
      done();
    });
*/
    
  });
});
