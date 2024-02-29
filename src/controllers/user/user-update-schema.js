const AdminUpdateSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    isLdap: {
      type: 'boolean'
    }
  },
  additionalProperties: false,
  required: []
}

module.exports = AdminUpdateSchema
