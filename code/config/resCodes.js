const authCodes = require('./resCodes/user/auth')
const tripCodes = require('./resCodes/user/trip')


/*
 This consolidates all resCode files into one place for easy access
*/
resObjs = {
  auth: authCodes,
  trip: tripCodes
}

module.exports = resObjs;
