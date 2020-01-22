var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/rand', function (req, res) {
	res.sendFile(dirname__ + "html/test.html")
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
