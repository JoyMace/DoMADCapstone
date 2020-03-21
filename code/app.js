const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
const path = require('path');

const cors = require('cors');

const port = 5000

// express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allows only the local react server to make calls to the backend
const corsOptions = {origin: 'http://localhost:' + process.env.PORT}
app.use(cors(corsOptions));

// connect to mongodb
mongooseInput = {
  useNewUrlParser: true
}
const connectionString = 'mongodb+srv://Thomas:D0MAD123@domad-hbe1i.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connectionString, mongooseInput);

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

app.listen(port, function (){
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app
