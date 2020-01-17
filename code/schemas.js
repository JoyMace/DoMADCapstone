
/* This is where all of the data base schemas will be defined */

var mongoose = require('mongoose');

/*
  Each collection requires a schema and a model.
  The model is then exported for use in other files
*/

var countryPageSchema = new mongoose.Schema({
  name: String
});
var countryPage = mongoose.model('Country', countryPageSchema);


module.exports = {
  countryPage: countryPage
}
