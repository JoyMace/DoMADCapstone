
testVar = {
  _id: 'TEST',
  filler: 'TEST',
  userInfo: {
    _id: 'TEST',
    username: 'TEST',
    firstName: 'TEST',
    lastName: 'TEST',
    email: 'TEST@TEST.COM',
    password: 'Password',
    verifyPassword: 'Password'
  },
  password: 'Password',
  badUsername: 'basUsername',
  badPassword: 'bad',
  wrongVal: 'WRONG',
  tripInfo: {
    _id: 'TEST',
    userID: 'TEST',
    isPrivate: true
  },
  locationInfo: {
    _id: 'TEST',
    country: 'TEST',
    city: 'TEST'
  },
  donationInfo: {
    _id: 'TEST',
    itemName: 'TEST', 
    rating: 4, 
    locationID: {
      _id: 'TEST',
      country: 'TEST', 
      city: 'TEST', 
      state: 'TEST', 
      zipCode: null
    },
    category: 'Miscellaneous', 
    donationDateTime: null, 
    reportingDateTime: null, 
    itemDescr: null, 
    pictures: null, 
    organization: true, 
    suggestion: false
  }
}

module.exports = testVar
