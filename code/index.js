var express = require('express');
var mongoose = require('mongoose');
var schemas = require('./schemas.js');
var path = require('path');
var app = express();

// Connect to MongoDB
mongoose_input = {
useNewUrlParser: true,
useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost/domad', mongoose_input);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});

// Example of creating a country page entry
// This is just an example and is not going to stay here in finished product
var brazil = new schemas.countryPage({ name:'Brazil' });
brazil.save(function(err, country) {
  if (err) return console.error(err);
  console.log('Country Saved!');
});


// Express
app.get('/', function (req, res) {
  console.log(req)
  res.sendFile(path.join(__dirname+'/html/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
