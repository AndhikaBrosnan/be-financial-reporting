const Sequelize = require('sequelize')
const MsTeamService = require('#third-party/msTeam')

module.exports = async (error, req, res, next) => {
  const { ERROR_WEBHOOK_BACKEND } = process.env

  switch (error.constructor) {
    case Sequelize.ValidationError:
      if (ERROR_WEBHOOK_BACKEND) {
        await MsTeamService.sendErrorDB(error.name, error.message, req, res)
      }

      return res.status(400).send({
        errors: [error.message],
        status: error.name,
        message: error.message,
        code: '400'
      })
    case Sequelize.UniqueConstraintError:
      if (ERROR_WEBHOOK_BACKEND) {
        await MsTeamService.sendErrorDB(
          error.name,
          error.errors[0].message,
          req,
          res
        )
      }

      return res.status(409).send({
        errors: [error.errors[0].message],
        status: error.name,
        message: error.message,
        code: '409'
      })
    case Sequelize.DatabaseError:
      if (ERROR_WEBHOOK_BACKEND) {
        await MsTeamService.sendErrorDB(error.name, error.message, req, res)
      }

      return res.status(500).send({
        errors: [error.message],
        status: error.name,
        message: error.message,
        code: '500'
      })
    default:
      next(error)
  }
}
