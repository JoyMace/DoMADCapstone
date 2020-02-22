const express = require('express');
const passport = require('passport');
const router = express.Router();


const User = require('../../models/user');
const resCode = require('../../config/resCode');

var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");



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
      let newUser = new User();

      newUser.username = username;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.setPassword(password);

      newUser.save(function(err, user_check) {
        if(err) {
          return res.status(resCode.signup.failedToAdd.status).send({
            message: resCode.signup.failedToAdd.message
          });
        }
        else {
          return res.status(resCode.signup.success.status).send({
            message: resCode.signup.success.message
          });
        }
      });
    }
  });

});


/*
  forgot password api

  let's users reset their password and redirect
  them to the login page
*/

router.get('/forgot', function(req, res) {
  res.redirect('forgot');
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          //req.flash('error', 'No account with that email address exists.');
          //return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          type: "login",
          user: "DOMAD24901@gmail.com",
          pass: "DoMADTemp#2020",
        }
      });

      var mailOptions = {
        to: user.email,
        from: 'DOMAD24901@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:' + 3000 + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        console.log('email: ' + user.email)
        //req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});


router.get(':token', function(req, res) {
  console.log('hello')
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      //req.flash('error', 'Password reset token is invalid or has expired.');
      console.log("Password reset token is invalid or has expired in get method")
      return res.redirect('/:token');
    }
    //res.redirect('forgot', {token: req.params.token});
    console.log("returning token: " + req.params.token)
    res.redirect('token', {token: req.params.token});
  });
});


router.post(':token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        console.log("found user")

        if (!user) {
          //req.flash('error', 'Password reset token is invalid or has expired.');
          console.log("Password reset token is invalid or has expired")
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {

          user.setPassword(req.body.password);//, function(err) {

          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function(err) {
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
          //}
        } else {
            //req.flash("error", "Passwords do not match.");
            console.log("Passwords do not match")
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      console.log("sending email")
      var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          type: "login",
          user: "DOMAD24901@gmail.com",
          pass: "DoMADTemp#2020",
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'DOMAD24901@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('success', 'Success! Your password has been changed.');
        console.log('Success! Your password has been changed.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    console.log("No error redirecting to page")
    res.redirect('/:token');
  });
});


/*
  contact us api

  sends contact us message to Domad Gmail
*/

router.get('/contact', function(req, res) {
  res.redirect('contact');
});

router.post('/contact', function(req, res) {


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
    to: email,
    from: name,
    subject: 'New message from contact us sent by ' + name,
    text: content
  };

  smtpTransport.sendMail(mailOptions, function(err) {
    res.redirect('/contact');
    done(err, 'done');

  });

})


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
