const BaseError = require("../utils/error")

module.exports = function(err , req , res , next){
  if(err instanceof BaseError){
    return res.status(err.status).json({message  :err.message , error : err.error})
  }

  return res.status(500).json({message : "Server is not working"})
}

