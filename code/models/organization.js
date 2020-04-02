// Organization mongoose model

const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  orgName: {type: String, required: true},
  link: {type: String, required: true}
});

const organization = mongoose.model('Organization', organizationSchema);

module.exports = organization