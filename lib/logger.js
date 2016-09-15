'use strict';

var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      showLevel: true,
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
      timestamp:true
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp:true
    }),
    new winston.transports.File({
      name: 'error-file',
      level: 'error',
      showLevel: true,
      filename: './logs/error-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      timestamp:true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
