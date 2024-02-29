const MsTeamService = require('#third-party/msTeam')

module.exports = async (error, req, res, next) => {
  if (!process.env.ERROR_WEBHOOK_BACKEND) {
    console.log(error)
  } else {
    await MsTeamService.sendErrorGeneral(error, req, res)
  }

  return res.status(500).send({
    status: 'Error',
    message: 'Internal Server Error',
    code: '500',

    // Send error detail if not production env
    ...(process.env.NODE_ENV !== 'production'
      ? {
          errorDetail: JSON.stringify(error, Object.getOwnPropertyNames(error))
        }
      : {})
  })
}
