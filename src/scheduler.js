const schedule = require('node-schedule')
const moment = require('moment')
const removeExpiringUserTokens = require('#commands/remove-expiring-user-tokens')
const removeExpiringAdminTokens = require('#commands/remove-expiring-admin-tokens')
const MsTeamService = require('#third-party/msTeam')

const logStart = async function (jobName) {
  console.log(`Job Started : ${jobName} - ${moment()}`)
}

const logFinish = async function (jobName) {
  console.log(`Job Finished : ${jobName} ${moment()}`)
}

const scheduler = {
  start () {
    // Job Name : Remove Expiring User Tokens
    // Function : Remove user tokens that created > 30 days every 24 hours (01:00)
    schedule.scheduleJob('0 1 * * *', async () => {
      await runFunction(
        'Remove Expiring User Tokens',
        removeExpiringUserTokens
      )
    })

    // Job Name : Remove Expiring Admin Tokens
    // Function : Remove admin tokens that created > 30 days every 24 hours (01:00)
    schedule.scheduleJob('0 1 * * *', async () => {
      await runFunction(
        'Remove Expiring Admin Tokens',
        removeExpiringAdminTokens
      )
    })
  }
}

const schedulerEmpty = {
  start () {}
}

const runFunction = async (fnName, fn) => {
  logStart(fnName)

  try {
    await fn()
  } catch (ex) {
    await MsTeamService.sendErrorSchedulerJob(ex)
  }
  logFinish(fnName)
}

if (process.env.RUN_SCHEDULER === 'true') {
  module.exports = scheduler
} else {
  module.exports = schedulerEmpty
}
