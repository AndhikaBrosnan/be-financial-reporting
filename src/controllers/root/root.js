const Prometheus = require('prom-client')

module.exports = class Controller {
  static async root (req, res) {
    res.serialize({ ok: true })
  }

  static async monit (req, res) {
    res.set('Content-Type', Prometheus.register.contentType)
    res.end(Prometheus.register.metrics().then((data) => { res.send(data) }))
  }
}
