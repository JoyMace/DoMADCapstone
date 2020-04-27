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
  },
  getOrganizations:{
    success:{
      status:200,
      message:'List of organizations returned successfully'
    },
    countryNotFound:{
      status:404,
      message:'Could not find country'
    },
    organizationsNotFound:{
      status:404,
      message:'Specified country has no organizations'
    }
  },
  insertOrganizations:{
    success:{
      status:200,
      message:'Successfully inserted organizations to specified country'
    },
    countryNotFound:{
      status:404,
      message:'Could not find specified country'
    },
    organizationsNotFound:{
      status:404,
      message:'Could not find organizations'
    },

  },
  removeOrganizations:{
    success:{
      status:200,
      message:'Successfully removed organizations of specified country'
    },
    countryNotFound:{
      status:404,
      message:'Could not find specified country'
    },
    noCountryOrganizations:{
      status:500,
      message:"Country has no organizations to remove"
    },
    saveCountryFail:{
      status:404,
      message:'Failed to save updated country to database'
    }
  }
}

module.exports = resCode
