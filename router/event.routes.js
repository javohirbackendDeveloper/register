const {Router} = require("express")
const { getElons, addElon, updateElon, deleteElon } = require("../controller/event.controller")
const { upload, addImage } = require("../controller/uploadEvents")

const { elonValidator } = require("../middleware/event.middle")
const {register, login,verify } = require("../controller/userProfile")


const eventRouter = Router()

eventRouter.get("/getElon" , getElons)
eventRouter.post("/addElon" ,elonValidator , addElon)
eventRouter.put("/updateElon/:id" ,elonValidator, updateElon)
eventRouter.delete("/deleteElon/:id" , deleteElon)

eventRouter.post("/upload" , upload.single("images") , addImage)


eventRouter.post("/register" , register)
eventRouter.post("/verify" , verify)
eventRouter.post("/login" , login)


module.exports = eventRouter