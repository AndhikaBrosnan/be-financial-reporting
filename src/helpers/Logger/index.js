const winston = require('winston')

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({
    filename: 'logs/info.log',
    level: 'info'
  }),
  new winston.transports.File({ filename: 'logs/app.log' })
]

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const useLogger = () => {
  const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment
      ? 'debug'
      : 'warn'
  }

  const logger = winston.createLogger({
    level: level(),
    levels,
    transports
  })

  console.log = function () {
    return logger.info.apply(logger, arguments)
  }

  console.error = function () {
    return logger.error.apply(logger, arguments)
  }

  return logger
}

const noLogger = () => {}

if (process.env.USE_LOGGER === 'true') {
  module.exports = useLogger()
} else {
  module.exports = noLogger()
}
