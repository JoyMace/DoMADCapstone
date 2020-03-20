const authCodes = require('./resCodes/user/auth')
const tripCodes = require('./resCodes/user/trip')
const donationCodes = require('./resCodes/user/donation')
const profileCodes = require('./resCodes/user/profile')

/*
 This consolidates all resCode files into one place for easy access
*/
resObjs = {
  auth: authCodes,
  trip: tripCodes,
  donation: donationCodes,
  profile: profileCodes
}

module.exports = resObjs;
