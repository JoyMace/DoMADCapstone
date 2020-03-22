const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
const path = require('path');

if(process.env.CHECK_HEROKU == null){
  console.log('running developement environment');
  require('custom-env').env('dev');
} else {
  console.log('running heroku environment');
}

const port = process.env.PORT || 5000

// express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongodb
mongooseInput = {
  useNewUrlParser: true
}
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, mongooseInput);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
  console.log('Mongoose connected!');
});

// connect passport
session_input = {
  secret: 'fighting mongoose',
  resave: true,
  saveUninitialized: false
}
app.use(session(session_input));
app.use(passport.initialize());
app.use(passport.session());

// connect routers
app.use('/api/user/auth', require('./routers/user/auth'));
app.use('/api/user/trip', require('./routers/user/trip'));
app.use('/api/user/reset', require('./routers/user/reset'));
app.use('/api/user/profile', require('./routers/user/profile'));
app.use('/api/contact-us/msg', require('./routers/contact_us/msg'));

// This routes all client side requests to REACT
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(port, function (){
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app
