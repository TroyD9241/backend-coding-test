const appRoot = require('app-root-path')
const winston = require('winston');


winston.add(new winston.transports.File({ filename: 'report.log', level: 'info', handleException: true, maxsize: 5242880, maxFiles: 10 }))


winston.info('Info message');
winston.log('Hi this is a test', 'info')
