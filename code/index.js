var express = require('express');
var app = express();
var path = require('path');
var router = express.Router(); //may not use it yet idk

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/Users';
var str = "";
var port = 3000;

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

router.get('/signup',function(req,res){
  res.sendFile(path.join(__dirname+'/signup.html'));
});

router.get('/usrpwd',function(req,res){
  res.sendFile(path.join(__dirname+'/usrpwd.html'));
});

app.route('/usrpwd').get(function(req, res){
	MongoClient.connect(url, function(err, db) {
		if(err) throw err;

	    mydb = db.db("Users");
	    var cursor = mydb.collection("Usrpwd").find();
	    cursor.each(function(err, item){
	    	// this function is executed on every item in the cursor, which can iterate through every doc in a collection

	    	if(item != null){
	    		str = str + "    Email:    " + item.email 
	    				+ "            Username:    " + item.username
	    				+ "            Password:    " + item.password + "</br>";
	    	}
	    })
	    // send string to web page
	    res.send(str);
	});
});

app.use('/', router);


// not body parser anymore, now it's express.urlencoded
// app.use(express.bodyParser());
// app.post('/', function(req, res) {
//   console.log(req.body);
//   res.send(200);
// });

// Make our entire server application listen on port 3000
var server = app.listen(port, function (){
	console.log(`Example app listening on port ${port}`);
});
