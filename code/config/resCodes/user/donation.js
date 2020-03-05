resCode = {
  report:{
    success:{
      status:201,
      message:'Donation added successfully'
    },
    addDonationFail:{
      status:400,
      message:'Failed to add donation'
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
      message:'Donation privacy successfully toggled'
    },
    DonationNotFound:{
      status:400,
      message:'Failed to find Donation by ID'
    },
    DonationUpdateFail:{
      status:400,
      message:'Failed to update donation'
    }
  },
  deleteDonation:{
    success:{
      status:200,
      message:'Donation successfully deleted'
    },
    checkDonationExistFail:{
      status:400,
      message:'Failed to check if donation exists'
    },
    donationNotFound:{
      status:404,
      message:'No donation with this ID was found'
    },
    deleteDonationFail:{
      status:400,
      message:'Failed to delete donation by ID',
    }
  },
  userDonations:{
    success:{
      status:200
    },
    userNotFound:{
      status:404,
      message:'Could not find user by ID'
    },
    donationsNotFound:{
      status:404,
      message:'Could not find one or more donations by ID' 
    },
    userNotGiven:{
      status:400,
      message:'No user id was given'
    }
  },
  allDonations:{
    success:{
      status:200
    },
    donationsNotFound:{
      status:404,
      message:'Could not find one or more donations by ID' 
    }
  }
}

module.exports = resCode
