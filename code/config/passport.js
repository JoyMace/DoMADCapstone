const localStrategy = require('passport-local').Strategy;

const resCode = require('./resCode');
const User = require('../models/user');

module.exports = function(passport) {
  // login
  passport.use(new localStrategy( 
    function(username, password, done) {
      var query = {$or: [
        {username: username},
        {email: username}
      ]}
      User.findOne(query, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(resCode.login.wrongUsername, null);
        }
        if (!user.validatePassword(password)) {
          return done(resCode.login.wrongPassword, null);
        }
        return done(null, user);
      });
    }
  ));

  // sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
