const { Op } = require('sequelize')
const { userToken: UserToken } = require('#models')

const runUpdate = async function () {
  /**
   * get date of 30 days before
   */
  const today = new Date()
  const priorDate = new Date(new Date().setDate(today.getDate() - 30))

  await UserToken.destroy({
    where: {
      updatedAt: {
        [Op.lt]: priorDate
      }
    }
  })
}

// Execute code when run manually from console
if (process.argv[2] === 'run') {
  runUpdate()
    .then(() => {
      process.exit(0)
    })
    .catch((err) => {
      console.log(err)
      process.exit(1)
    })
}

module.exports = runUpdate
