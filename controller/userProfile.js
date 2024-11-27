const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = require("../schema/user.schema")
const elonSchema = require("../schema/event.schema")
const nodemailer = require("nodemailer")
require("dotenv").config()

const register = async (req , res , next) => {
  try{
    const {email , password  } = req.body
    // const findUser =await userSchema.findOne({email})
    
    // if (!findUser) {
    //   return res.json({
    //     message:"this email alrady exist",
    //     status : 404

    //   })
    // }

    

    const transporter = await nodemailer.createTransport({
      service : "gmail",
      auth : {
        user : process.env.GMAIL_GOOGLE,
        pass  : process.env.GOOGLE_PASSKEY
      }
    })

    const randomNumber = await  Array.from({length : 6} , () => Math.floor(Math.random() * 10)).join("")
    

    const send = {
      from : process.env.GMAIL_GOOGLE,
      to  :email,
      subject : "test",
      html : `<p style = " font-size : 30px;">Tasdiqlash kodi : <b style = "color : blue;">${randomNumber}</b></p>`
    }

    await transporter.sendMail(send , (error , info) => {
      if (error) {
        res.json({
          message : error.message
        })
      }else{
         res.json({
          message : info.response
        })
      }
    })

    const hash = await bcrypt.hash(password , 12)

    const findUser = await userSchema.create({email , password : hash , verify_code : randomNumber})
  
    setTimeout(async () => {
      await userSchema.findByIdAndUpdate(findUser._id , {verify_code : ""})
    }, 60 * 1000);
    res.json({
      message : "Registered"
    })
  }catch(error){
    throw new Error(error.message)
  }
}



const verify = async (req , res , next) => {
  try{
    const {email , verify_code_by_client} = req.body

    const findUser = await userSchema.findOne({email})
    
    if (!findUser) {
      res.json({
        message : "User not found"
      })
    }

    if (findUser.verify_code === verify_code_by_client) {
      await userSchema.findByIdAndUpdate(findUser._id , {verify : true})
    }else{
      res.json({
        message : "Your verify code is invalid or expired"
      })
    }
  }catch(error) {
    next(error)
  }
}



const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;


    const findUser = await userSchema.findOne({ username });

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    
    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    
    const elonsOfUser = await elonSchema.find({ author: findUser.username });

    if (!elonsOfUser) {
      return res.status(404).json({
        message: "You have not posted any announcements",
      });
    }

    const aboutUser =await userSchema.findOne({email})
    
    
    res.status(200).json({
      userInformation: aboutUser,
      elonsOfThisUser: elonsOfUser
    });
   
  
  } catch (error) {
    next(error);
  }
};







module.exports = {
   register,
   verify,
   login

}