resCode = {
  report:{
    userProfile:{
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
  }
}

module.exports = resCode
