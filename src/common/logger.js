const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


// DailyRotateFile requires file system permissions to create files
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      level: 'info',
      filename: 'info-%DATE%.log',
      datePattern: 'MM-DD-YYYY'
    }),
    new DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      datePattern: 'MM-DD-YYYY',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    })
  ]
});

module.exports = logger;
