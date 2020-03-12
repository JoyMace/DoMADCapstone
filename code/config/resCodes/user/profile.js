resCode = {
  profile:{
      success:{
        status:200
      },
      userNotFound:{
        status:404,
        message:'Could not find user by ID'
      },
      userNotGiven:{
        status:400,
        message:'No user id was given'
      },
      profileNotFound:{
        status:404,
        message:'Could not find user profile'
      },
      tripcountNotFound:{
        status:400,
        message:'Could not find user trip count'
      }
    }
}

module.exports = resCode
