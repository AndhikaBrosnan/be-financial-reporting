const CreateSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number'
    },
    errorCode: {
      type: 'number'
    },
    errorMessage: {
      type: 'string'
    },
    serverUrl: {
      type: 'string'
    },

    clientUrl: {
      type: 'string'
    },
    clientNote: {
      type: 'string'
    },

    userNote: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: ['clientUrl']
}

module.exports = { CreateSchema }
