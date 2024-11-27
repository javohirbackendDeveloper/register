const express = require("express")
const cors = require("cors")
const eventRouter = require("./router/event.routes")
const { connectDB } = require("./db/connectEvent")
const { upload } = require("./controller/uploadEvents")
const errorMiddle = require("./middleware/error.middle")
require("dotenv").config()
const logger = require("./service/logger")
const getWinstar = require("./controller/gettingWinstar.controller")


const app = express()

app.use(express.json())
app.use(cors())
connectDB()

app.use(eventRouter)


// logger.error("logger error")
// logger.warn("logger warn")
// logger.info("logger info")
// logger.debug("logger debug")


app.use("/images" , express.static("upload/images"))

const PORT = process.env.PORT || 5000


app.use(errorMiddle)
app.listen(PORT , () => {
  console.log("Server is running on the "  + PORT);
  
})
