resCode = {
  insertCountry:{
      success:{
        status:200,
        message:'Country added successfully'
      },
      userNotGiven:{
        status:400,
        message:'No user id was given'
      },
      addCountryFail:{
        status:400,
        message:'Failed to add country'
      }
    },
    countryInfo:{
      success:{
        status:200,
        message:'Country info returned successfully'
      },
      countryNotFound:{
        status:404,
        message:'Could not find country'
      }
    }
}

module.exports = resCode
