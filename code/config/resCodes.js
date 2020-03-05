const authCodes = require('./resCodes/user/auth')
const tripCodes = require('./resCodes/user/trip')
const donationCodes = require('./resCodes/user/donation')

/*
 This consolidates all resCode files into one place for easy access
*/
resObjs = {
  auth: authCodes,
  trip: tripCodes,
  donation: donationCodes
}

module.exports = resObjs;
