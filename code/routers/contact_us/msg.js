const express = require('express');
const passport = require('passport');
const router = express.Router();


const User = require('../../models/user');

var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");


/*
  contact us api

  sends contact us message to Domad Gmail
*/


router.post('/contact', function(req, res) {

  var name = req.body.firstname + " " + req.body.lastname
  var email = req.body.email
  var message = req.body.message
  var content = `Name: ${name} \nEmail: ${email} \nMessage: ${message} `

  if(req.body.email == "" || req.body.message == "") {
      console.log("Error: Email & body should not be Blank");
      return false;
  }

  var smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: "DoMADworldwide@gmail.com",
      pass: "Newaccount8",
    }
  });

  var mailOptions = {
    to: process.env.EMAIL_USERNAME,
    from: name,
    subject: 'New message from contact us sent by ' + name,
    text: content
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    res.redirect('/contact');
    done(err, 'done');

  });

})


module.exports = router;
