

const {Schema , model} = require("mongoose")




const elonSchema = new Schema({
  text : {
    type : String,
    required : true,
    minLength : [5 , "The text must be at least 5 words"],
    maxLength : [1000 , "The text must be less than 1000 words"]
  },
  date  :{
    type : String,
    required: true
  },
  author  :{
    type : String,
    required : true
  },
  place:{
    type : String,
    required : true
  },
  typeOfElon : {
    type : String,
    required : true,
    enum : {
      values : ["work" , "study" , "business"],
      message : "{VALUE} - This type of event is not found"
    }
  }
})


module.exports = model("Announcements" , elonSchema )