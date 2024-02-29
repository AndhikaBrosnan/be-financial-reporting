const { errorReport: ErrorReport } = require('#models')

const ErrorReportService = {
  async create (payload) {
    return await ErrorReport.create(payload)
  }
}

module.exports = ErrorReportService
