const elonSchema = require("../schema/event.schema")

require("dotenv").config()


const getElons =async  (req , res , next) =>{
  try{
    const elon = await elonSchema.find()
    res.json(elon)
  }catch(error){
    next(error)
  }
}


const addElon =async (req , res , next) =>{
  try{
    const {text , date , author , typeOfElon , place} = req.body

    await elonSchema.create({text , date , author  ,  typeOfElon , place})
    res.json({
      message : "Added"
    })
  }catch(error){
    next(error)
  }
}

const updateElon = async (req , res , next) =>{
  try{
   
   const {id} = req.params
   const updated = req.body
    await elonSchema.findByIdAndUpdate({_id : id}, updated )
    res.json({
      message : "Updated your information"
    })
  }catch(error){
    next(error)
  }
}

const deleteElon =async (req , res , next) =>{
  try{
    const {id} = req.params
    const deleted = req.body
   await elonSchema.findByIdAndDelete({_id : id} , deleted)
    res.json({
      message : "Deleted"
    })
  }catch(error){
    next(error)
  }
}

module.exports = {
  getElons,
  addElon,
  updateElon,
  deleteElon
}