const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination : "./upload/images",
  filename : (req , file , cb) => {
    return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage})

const addImage = (req , res , next) =>{
  try{
    res.json({
      message : "success 1",
      link : `http://localhost:4000/images/${req.file.filename}`
    })
  }catch(error){
    next(error)
  }
}

module.exports = {addImage , upload}