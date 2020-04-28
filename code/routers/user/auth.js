const express = require('express');
const passport = require('passport');
const router = express.Router();


const User = require('../../models/user');
const Location = require('../../models/location');
const authCode = require('../../config/resCodes').auth;

var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");



/*
  login api

  inputs:
    username: String
    password: String

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
      return res.status(authCode.login.success.status).send({message: authCode.login.success.message});
    });
  })(req, res, next);
});

/*
  signup api

  inputs:
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    verifyPassword: String
    country: String
    city: String

  checks given information and creates a new user
*/
router.post('/signup', function(req, res) {
  const { username, firstName, lastName, email, password, verifyPassword, country, city } = req.body;

  // check if required fields are filled
  // ( check if there is a better way of checking these )
  if (!username || !firstName || !lastName || !email || !password || !verifyPassword) {
    return res.status(authCode.signup.missingFields.status).send({
      message: authCode.signup.missingFields.message
    });
  }

  // verify password
  if ( password != verifyPassword ) {
    return res.status(authCode.signup.verifyPassword.status).send({
      message: authCode.signup.verifyPassword.message
    });
  }

  // password requirements
  if ( !/[a-z]/.test(password) || // check for lowercase letter
       !/[A-Z]/.test(password) || // check for uppercase letter
       password.length < 8 ){ // check if password has atleast 8 letters

    return res.status(authCode.signup.passwordReq.status).send({
      message: authCode.signup.passwordReq.message
    });
  }

  // check if user already exists
  let userQuery = {$or: [
    {username: username},
    {email: username}
  ]}

  User.findOne(userQuery, function(err, user) {
    if (user) {
      return res.status(authCode.signup.userExists.status).send({
        message: authCode.signup.userExists.message
      });
    }else{
      // create user
      var newUser = new User();

      newUser.username = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.setPassword(password);

      locationQuery = {
        country: country,
        city: city
      }

      // Get a location id for new user
      Location.findOneOrCreate(locationQuery, function(err, loc) {
        //This is causing errors so I've commented it out
        //newUser.locationID = loc._id;

        newUser.save(function(err, user) {
          if(err) {
            return res.status(authCode.signup.failedToAdd.status).send({
              message: authCode.signup.failedToAdd.message
            });
          } else {
            return res.status(authCode.signup.success.status).send({
              message: authCode.signup.success.message
            });
          }
        });
      });
    }
  });

});


/*
  logout api

  logs a user out of their current local session
*/
router.post('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
    // return res.status(authCode.logout.success.status).send({message: authCode.logout.success.message});

});

/*
  Check if a user is logged in api

  Checks if there is a user logged in by checking for a passport session
*/
router.get('/check-login', function(req, res) {
  if (req.user) {
    return res.status(authCode.checkLogin.success.status).send({message: authCode.checkLogin.success.message});
  } else {
    return res.status(authCode.checkLogin.noUserSessionFound.status).send({message: authCode.checkLogin.noUserSessionFound.message});
  }
});

module.exports = router;
