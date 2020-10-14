const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    })
  ]
});

module.exports = logger;
