const authCodes = require('./resCodes/user/auth')
const tripCodes = require('./resCodes/user/trip')
const donationCodes = require('./resCodes/user/donation')
const profileCodes = require('./resCodes/user/profile')
const countryCodes = require('./resCodes/countryPage/country')

/*
 This consolidates all resCode files into one place for easy access
*/
resObjs = {
  auth: authCodes,
  trip: tripCodes,
  donation: donationCodes,
  profile: profileCodes,
  country: countryCodes
}

module.exports = resObjs;
