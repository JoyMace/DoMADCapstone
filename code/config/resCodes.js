const authCodes = require('./resCodes/user/auth')
const tripCodes = require('./resCodes/user/trip')
const profileCodes = require('./resCodes/user/profile')



/*
 This consolidates all resCode files into one place for easy access
*/
resObjs = {
  auth: authCodes,
  trip: tripCodes,
  profile: profileCodes
}

module.exports = resObjs;
