const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, colorize, errors } = format

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${message} || ${stack}`
})

const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
    ),
    defaultMeta: { service: 'user-services' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/app.log' })
    ],
});

module.exports = logger
