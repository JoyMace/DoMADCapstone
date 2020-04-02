
const mongoose = require('mongoose');
const crypto = require('crypto');

const locationSchema = new mongoose.Schema({
  
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  zipCode: String

});

// Source: https://stackoverflow.com/questions/40102372/find-one-or-create-with-mongoose
locationSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, function(err, result){
    return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  });
}

const location = mongoose.model('Location', locationSchema)

module.exports = location
