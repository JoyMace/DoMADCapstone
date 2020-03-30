
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
    isPrivate: true,
    donations: [ 'TEST1', 'TEST2' ],
    ratings: [ 3, 4 ]
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
    donationDate: null, 
    itemDescription: null, 
    organization: true, 
    suggestion: false
  }
}

module.exports = testVar
