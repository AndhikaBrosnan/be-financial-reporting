const { CreateSchema } = require('./schema')
const ErrorReportService = require('#services/errorReport')
const MsTeamService = require('#services/third-party/msTeam')

module.exports = class Controller {
  static async createPublic (req, res) {
    const { body, sanitize } = req
    sanitize(CreateSchema, body)
    const result = await ErrorReportService.create(body)
    if (process.env.ERROR_WEBHOOK_BACKEND) await MsTeamService.sendErrorFE(result)

    return res.serialize({ result })
  }

  static async createAuthenticated (req, res) {
    const { body, sanitize, userId } = req
    sanitize(CreateSchema, body)
    const result = await ErrorReportService.create({ ...body, userId })
    if (process.env.ERROR_WEBHOOK_BACKEND) await MsTeamService.sendErrorFE(result)

    return res.serialize({ result })
  }
}
