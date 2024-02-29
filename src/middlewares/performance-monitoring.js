const {
  httpRequestDurationMicroseconds
} = require('#configurations/prometheus')

const calculateResponse = (error, req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch

  // if (req?.route?.path && req?.route?.path === '/metrics') {
  if (req?.route?.path) {
    httpRequestDurationMicroseconds
      .labels(req.method, req?.route?.path, res.statusCode)
      .observe(responseTimeInMs)
  }

  next(error)
}

const startMonitor = (_, res, next) => {
  res.locals.startEpoch = Date.now()
  next()
}

module.exports = { calculateResponse, startMonitor }
