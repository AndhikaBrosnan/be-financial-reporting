const Prometheus = require('prom-client')

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: `${process.env.APP_NAME}_${process.env.NODE_ENV}_http_request_duration_ms`,
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
})

const failedDbConnectionCounter = new Prometheus.Counter({
  name: `${process.env.APP_NAME}_${process.env.NODE_ENV}_failed_db_connection`,
  help: 'Total failed DB connections',
  labelNames: ['name', 'code', 'message']
})

const dbQueryTimeoutCounter = new Prometheus.Counter({
  name: `${process.env.APP_NAME}_${process.env.NODE_ENV}_db_query_timeout`,
  help: 'Total DB query timeouts',
  labelNames: ['name', 'code', 'message']
})

module.exports = {
  httpRequestDurationMicroseconds,
  failedDbConnectionCounter,
  dbQueryTimeoutCounter
}
