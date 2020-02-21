const express = require('express');
const passport = require('passport');
const router = express.Router();


const User = require('../../models/user');
const resCode = require('../../config/resCode');

/*
  login api
  
  required form inputs:
      username: text
      password: text ( password ) 

  logs a user in using passport and creates local session
  redirects user to /success or /failure depending on if the login was successful
*/

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { 
      if (err.hasOwnProperty('status') && err.hasOwnProperty('message')) {
        return res.status(err.status).send({message: err.message});
      } else {
        return res.status(400).send({message: err});
      }
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(resCode.login.success.status).send({message: resCode.login.success.message});
    });
  })(req, res, next);
});

/*
  signup api
  
  required form inputs:
      username: text
      firstName: text
      lastName: text
      email: text
      password: text ( password ) 
      verifyPassword: text ( password )

  checks given information and creates a new user
*/
router.post('/signup', function(req, res) {
  const { username, firstName, lastName, email, password, verifyPassword } = req.body;

  // check if required fields are filled
  // ( check if there is a better way of checking these )
  if (!username || !firstName || !lastName || !email || !password || !verifyPassword) {
    return res.status(resCode.signup.missingFields.status).send({
      message: resCode.signup.missingFields.message
    });
  }

  // verify password 
  if ( password != verifyPassword ) {
    return res.status(resCode.signup.verifyPassword.status).send({
      message: resCode.signup.verifyPassword.message
    });
  }

  // password requirements
  if ( !/[a-z]/.test(password) || // check for lowercase letter
       !/[A-Z]/.test(password) || // check for uppercase letter 
       password.length < 8 ){ // check if password has atleast 8 letters

    return res.status(resCode.signup.passwordReq.status).send({
      message: resCode.signup.passwordReq.message
    });
  }

  // check if user already exists
  let userQuery = {$or: [
    {username: username},
    {email: username}
  ]}

  User.findOne(userQuery, function(err, user) {
    if (user) {
      return res.status(resCode.signup.userExists.status).send({
        message: resCode.signup.userExists.message
      });
    }else{
      // create user  
      var newUser = new User();

      newUser.username = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.setPassword(password);

      newUser.save(function(err, user) {
        if(err) {
          return res.status(resCode.signup.failedToAdd.status).send({
            message: resCode.signup.failedToAdd.message
          });
        } else {
          return res.status(resCode.signup.success.status).send({
            message: resCode.signup.success.message
          });
        }
      });
    }
  });

});

/*
  logout api

  logs a user out of their current local session
  and redirects thme to /loggedout
*/
router.post('/logout', function(req, res){
  req.logout();
  res.redirect('/loggedout');
});

module.exports = router; 
