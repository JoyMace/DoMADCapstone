resCode = {
  report:{
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
      }
  },
  profileReport:{
      success:{
        status:200
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
