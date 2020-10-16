const { json } = require('express');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => new Date().toLocaleString('en-US')
    }),
    winston.format.printf(
      info => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new DailyRotateFile({
      level: 'info',
      filename: 'info-%DATE%.log',
      datePattern: 'MM-DD-YYYY',
      maxSize: 5242880, //5mb
      maxFiles: 1
    }),
    new DailyRotateFile({
      level: 'error',
      filename: 'error-%DATE%.log',
      datePattern: 'MM-DD-YYYY',
      maxSize: 5242880, //5mb
      maxFiles: 1
    })
  ]
});

module.exports = logger;
