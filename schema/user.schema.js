const {Schema , model} = require("mongoose")


const userSchema = new Schema({
  username : {
    type : String,
    // required : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  role : {
    type : String,
    default : "user",
    enum: {
      values : ["user" , "admin" , "superAdmin"],
      message : "{VALUE} - this is not found"
    }
  },
  verify : {
    type : Boolean,
    default : false
  },
  verify_code : {
    type : String,
  }
})

module.exports = model("Users" , userSchema)
