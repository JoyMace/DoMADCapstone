// Organization mongoose model

const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  orgName: {type: String, required: true},
  link: {type: String, required: true}
});

// Source: https://stackoverflow.com/questions/40102372/find-one-or-create-with-mongoose
OrganizationSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, function(err, result){
    return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  });
}

const organization = mongoose.model('Organization', organizationSchema);

module.exports = organization