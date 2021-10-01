const appRoot = require('app-root-path')
const { createLogger, format, transports } = require('winston')
const { combine, splat, timestamp, printf, simple, label } = format

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message}`
    if (metadata) {
        msg += JSON.stringify(metadata)
    }
    return msg
})

const options = {
    file: {
        level: 'debug',
        name: 'file.info',
        filename: `${appRoot}/logs/app.log`,
        handleException: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 100,
        colorize: true
    },
    console: {
        level: 'debug',
        handleException: true,
        json: false,
        colorize: true
    },
}

const logger = new createLogger({
    format: combine(
        label({ label: 'CUSTOM', message: true }),
        timestamp(),
        simple()
    ),
    format: combine(
        format.colorize(),
        splat(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(options.console),
        new transports.File(options.file),

    ],
})

logger.info('HII')
logger.error('Errors!')

module.exports = logger
