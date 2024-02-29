const axios = require('axios')

const MsTeamService = {
  async sendErrorGeneral (error, req, res) {
    const serverName = process.env.SERVER_NAME
    const serverHostname = process.env.SERVER_HOSTNAME
    const channel = process.env.ERROR_WEBHOOK_BACKEND

    if (!serverName || !serverHostname || !channel) {
      return
    }
    const message = `${error.name}: ${error.message}`
    const trace = error.stack
    const requestPayload = this._generatePayload(req)
    const errorSection = {
      activityTitle: '**Message**',
      facts: [
        {
          name: '- Message Type',
          value: 'Error'
        },
        {
          name: '- Message',
          value: '```\n' + message
        },
        {
          name: '- Stack Trace',
          value: '```\n' + trace
        }
      ]
    }
    requestPayload.sections.push(errorSection)
    await this._sendWebhook(channel, requestPayload)
  },

  async sendErrorDB (errorName, errorMessage, req, res) {
    const serverName = process.env.SERVER_NAME
    const serverHostname = process.env.SERVER_HOSTNAME
    const channel = process.env.ERROR_WEBHOOK_BACKEND

    if (!serverName || !serverHostname || !channel) {
      return
    }
    const requestPayload = this._generatePayload(req)
    const errorSection = {
      activityTitle: '**Message**',
      facts: [
        {
          name: '- Message Type',
          value: 'Error'
        },
        {
          name: '- Message',
          value: '```\n' + errorName
        },
        {
          name: '- Stack Trace',
          value: '```\n' + errorMessage
        }
      ]
    }
    requestPayload.sections.push(errorSection)
    await this._sendWebhook(channel, requestPayload)
  },

  async sendErrorFE (body) {
    const serverName = process.env.SERVER_NAME
    const serverHostname = process.env.SERVER_HOSTNAME
    const channel = process.env.ERROR_WEBHOOK_BACKEND

    if (!serverName || !serverHostname || !channel) {
      return
    }
    const requestPayload = {}
    requestPayload['@type'] = 'MessageCard'
    requestPayload['@context'] = 'https://schema.org/extensions'
    requestPayload.themeColor = '00780D7'
    requestPayload.title = 'Client Error Notification'
    requestPayload.text = '**Frontend Error**'
    const requestInfoSection = {
      activityTitle: '**Request Info**',
      facts: [
        {
          name: '- Client URL',
          value: '```\n' + body.clientUrl
        },
        {
          name: '- Server URL',
          value: '```\n' + body.serverUrl
        }
      ]
    }
    const errorSection = {
      activityTitle: '**Message**',
      facts: [
        {
          name: '- Message',
          value: '```\n' + body.errorMessage
        },
        {
          name: '- Client Note',
          value: '```\n' + body.clientNote
        },
        {
          name: '- User Note',
          value: '```\n' + body.userNote
        }
      ]
    }
    const sysInfoSection = {
      activityTitle: '**System Information**',
      facts: [
        {
          name: '- Server Name',
          value: process.env.SERVER_NAME
        },
        {
          name: '- Server Hostname',
          value: process.env.SERVER_HOSTNAME
        }
      ]
    }
    requestPayload.sections = [
      sysInfoSection,
      requestInfoSection,
      errorSection
    ]
    await this._sendWebhook(channel, requestPayload)
  },

  _generatePayload (req) {
    const requestPayload = {}
    requestPayload['@type'] = 'MessageCard'
    requestPayload['@context'] = 'https://schema.org/extensions'
    requestPayload.themeColor = '00780D7'
    requestPayload.title = 'Server Error Notification'
    requestPayload.text = '**Backend Database Error**'
    const url = req.protocol + '://' + req.get('host') + req.originalUrl
    const requestInfoSection = {
      activityTitle: '**Request Info**',
      facts: [
        {
          name: '- Request URL',
          value: '```\n' + url
        },
        {
          name: '- Request Body',
          value: '```\n' + JSON.stringify(req.body)
        }
      ]
    }
    const sysInfoSection = {
      activityTitle: '**System Information**',
      facts: [
        {
          name: '- Framework',
          value: 'Express.js 14.7.1'
        },
        {
          name: '- DBMS',
          value: 'PostgreSQL 12.10 Google CSQL'
        },
        {
          name: '- Server Name',
          value: process.env.SERVER_NAME
        },
        {
          name: '- Server Hostname',
          value: process.env.SERVER_HOSTNAME
        }
      ]
    }
    requestPayload.sections = [sysInfoSection, requestInfoSection]
    return requestPayload
  },

  async _sendWebhook (channel, payload) {
    try {
      await axios({
        url: channel,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: payload
      })
    } catch (err) {
      // console.log(err)
      // do nothing, to avoid multiple and recursive requests
    }
  }
}

module.exports = MsTeamService
