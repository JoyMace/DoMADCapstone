resCode = {
  toggleHide:{
    success:{
      status:200,
      message:'Trip admin hide succefully toggled' 
    },
    tripNotFound:{
      status:400,
      message:'Failed to find trip by ID'
    },
    tripUpdateFail:{
      status:400,
      message:'Failed to update trip'
    }
  } ,
  banUser:{
    success:{
      status:200,
      message:'User has been banned'
    },
    missingInfo:{
      status:400,
      message:'Need username or email'
    },
    updateFail:{
      status:500,
      message:'Mongoose failed to find and update'
    },
    userNotFound:{
      status:404,
      message:'User not found'
    }
  },
  unbanUser:{
    success:{
      status:200,
      message:'User has been unbanned'
    },
    missingInfo:{
      status:400,
      message:'Need username or email'
    },
    updateFail:{
      status:500,
      message:'Mongoose failed to find and update'
    },
    userNotFound:{
      status:404,
      message:'User not found'
    }
  }
}

module.exports = resCode;
