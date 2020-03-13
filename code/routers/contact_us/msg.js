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

  console.log("inside msg router")
  var name = req.body.firstname + " " + req.body.lastname
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  console.log(content)
  if(req.body.email == "" || req.body.message == "") {
      console.log("Error: Email & body should not be Blank");
      return false;
  }

  var smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: "DOMAD24901@gmail.com",
      pass: "DoMADTemp#2020",
    }
  });

  var mailOptions = {
    to: "DOMAD24901@gmail.com",
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
