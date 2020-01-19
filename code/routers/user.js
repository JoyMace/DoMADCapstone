const express = require('express')
const router = express.Router();

const user = require('../models/user');

// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
router.post('/login', function(req, res) {
  user.findOne({ username: req.body.username }, function(err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found"
      });
    }
    else {
      if (user.validatePassword(req.body.password)) {
        return res.status(201).send({
          message: "user logged in"
        });
      }
      else {
        return res.status(400).send({
          message: "Wrong password"
        });
      }
    }
  });
});

// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
router.post('/signup', function(req, res) {
  
  let newUser = new user();

  newUser.username = req.body.username;
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;
  newUser.setPassword(req.body.password);

  newUser.save(function(err, user) {
    if(err) {
      return res.status(400).send({
        message: "Failed to add user"
      });
    }
    else {
      return res.status(201).send({
        message: "User added successfully"
      });
    }
  });
})
module.exports = router; 
