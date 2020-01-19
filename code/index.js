const express = require('express');
const mongoose = require('mongoose');
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

// connect signup/login api
var user = require('./routers/user');
app.use('/api/user', user)

// Express
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/html/index.html'));
});


/*
// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
app.post('/login', function(req, res) {
  schemas.user.findOne({ username: req.body.username }, function(err, user) {
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
app.post('/signup', function(req, res) {
  
  let newUser = new schemas.user();

  newUser.username = req.body.username;
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
});*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
