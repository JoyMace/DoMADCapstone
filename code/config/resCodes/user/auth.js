resCode = {
  login:{
    success:{
      status:200,
      message:'User successfully logged in'
    },
    wrongUsername:{
      status:401,
      message:'Incorrect username' 
    },
    wrongPassword:{
      status:401,
      message:'Incorrect password'
    }
  },
  signup:{
    success:{
      status:201,
      message:'User added successfully'
    },
    missingFields:{
      status:400,
      message:'Fill in required fields'
    },
    verifyPassword:{
      status:400,
      message:'Passwords do not match'
    },
    passwordReq:{
      status:400,
      message:'Password requirements not met'
    },
    userExists:{
      status:400,
      message:'User already exists with that username or email' 
    },
    failedToAdd:{
      status:400,
      message:'Failed to add user'
    }
  }
}

module.exports = resCode
