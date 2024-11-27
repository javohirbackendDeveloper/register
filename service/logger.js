const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, json } = format;
require("winston-mongodb")
require("dotenv").config()
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}]  (${level}) :  ${message}`;
});

const forJson = printf(({ level, message, timestamp }) => {
  return `{
    "timestamp": "${timestamp}",
    "level": "${level}",
    "message": "${message}"
  }`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({level: "debug", format: combine(
      colorize({
        level: true,    
          all: true,     
          colors: {
            info: 'magenta strikethrough',    
            warn: 'green italic',             
            error: 'red underline',           
            debug: 'gray'  }
      }),
      timestamp(),
      myFormat)}),
      new transports.File({filename: 'log/error.log',level: "error"}),
      new transports.File({filename: 'log/logfile.json',format: combine(json() , timestamp() , forJson)}),
      new transports.MongoDB({db : process.env.MONGODB_URL})
  ]
});


module.exports = logger;
