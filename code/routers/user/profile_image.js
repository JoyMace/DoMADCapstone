const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");

const User = require('../../models/user');

const profileCodes = require('../../config/resCodes').profile;

const storage = multer.diskStorage({
   destination: "./client/public/images",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");



router.post('/upload', (req, res) => {
    upload(req, res, function (err) {

        imageName = req.file["filename"]

        var userID;
        // checks if user is logged in or external request

        if ('userID' in req.query){
          userID = req.query.userID;
        } else if ('_id' in req.query) {
          userID = req.query._id;
        } else if ('user' in req) {
          userID = req.user._id;
        } else {
          return res.status(profileCodes.profile.userNotGiven.status).send({
            message: profileCodes.profile.userNotGiven.message});
        }

        User.findById(userID, function (err, user) {
          user.imageName = imageName;

          user.save(function (err) {
              if(err) {
                  console.error('ERROR!');
                  return res.send(200).end();
              }
              else{
                console.log("Successfully added image name to user model.")
              }
          });
        });


    });
});


router.get('/retrive-image', function (req, res) {

    var userID;

    if ('userID' in req.query){
      userID = req.query.userID;
    } else if ('_id' in req.query) {
      userID = req.query._id;
    } else if ('user' in req) {
      userID = req.user._id;
    } else {
      return res.status(profileCodes.profile.userNotGiven.status).send({
        message: profileCodes.profile.userNotGiven.message});
    }


    User.findById(userID, function (err, user) {

      var imageData = user.imageName;

      return res.status(profileCodes.profile.success.status).send({imageName: imageName});
    });

});

module.exports = router;
