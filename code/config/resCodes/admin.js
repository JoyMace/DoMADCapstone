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
  } 
}

module.exports = resCode;
