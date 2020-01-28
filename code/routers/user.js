const express = require('express')
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

/*
  login api
  
  required form inputs:
      username: text
      password: text ( password ) 

  logs a user in using passport and creates local session
  redirects user to /success or /failure depending on if the login was successful
*/
router.post('/login',
  passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/failure'})
);

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
    return res.status(400).send({
      message: 'Fill in required fields'
    });
  }

  // verify password 
  if ( password != verifyPassword ) {
    return res.status(400).send({
      message: 'Passwords do not match'
    });
  }

  // password requirements
  if ( !/[a-z]/.test(password) || // check for lowercase letter
       !/[A-Z]/.test(password) || // check for uppercase letter 
       password.length < 8 ){ // check if password has atleast 8 letters

    return res.status(400).send({
      message: 'Password requirements not filled'
    });
  }

  // check if user already exists
  let user_query = {$or: [
    {username: username},
    {email: username}
  ]}

  User.findOne(user_query, function(err, user, next) {
    if (user) {
      return res.status(400).send({
        message: 'User already exists with that username or email'
      });
    }else{
      // create user  
      let newUser = new User();

      newUser.username = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.setPassword(password);

      newUser.save(function(err, user_check) {
        if(err) {
          return res.status(400).send({
            message: 'Failed to add user'
          });
        }
        else {
          return res.status(201).send({
            message: 'User added successfully'
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
