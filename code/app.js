const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
const path = require('path');

// express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongodb
mongoose_input = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect('mongodb://localhost/domad', mongoose_input);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
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
app.use('/', require('./routers/index'));
app.use('/api/user', require('./routers/user'));

app.listen(3000, function (){
  console.log('Example app listening on port 3000!');
});
