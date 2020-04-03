resCode = {
  report:{
    success:{
      status:201,
      message:'Trip added successfully'
    },
    badWordsFound:{
      status:400,
      message:'Profanity found in the input'
    },
    addTripFail:{
      status:400,
      message:'Failed to add trip'
    },
    userNotFound:{
      status:400,
      message:'Failed to find user by ID'
    },
    userUpdateFail:{
      status:400,
      message:'Failed to update user'
    },
    userNotGiven:{
      status:400,
      message:'No user id was given'
    }
  },
  togglePrivacy:{
    success:{
      status:200,
      message:'Trip privacy successfully toggled'
    },
    tripNotFound:{
      status:400,
      message:'Failed to find trip by ID'
    },
    tripUpdateFail:{
      status:400,
      message:'Failed to update trip'
    }
  },
  deleteTrip:{
    success:{
      status:200,
      message:'Trip successfully deleted'
    },
    checkTripExistFail:{
      status:400,
      message:'Failed to check if trip exists'
    },
    tripNotFound:{
      status:404,
      message:'No trip with this ID was found'
    },
    deleteTripFail:{
      status:400,
      message:'Failed to delete trip by ID',
    }
  },
  userTrips:{
    success:{
      status:200
    },
    userNotFound:{
      status:404,
      message:'Could not find user by ID'
    },
    tripsNotFound:{
      status:404,
      message:'Could not find one or more trips by ID' 
    },
    userNotGiven:{
      status:400,
      message:'No user id was given'
    }
  },
  allTrips:{
    success:{
      status:200
    },
    tripsNotFound:{
      status:404,
      message:'Could not find one or more trips by ID' 
    }
  }
}

module.exports = resCode
