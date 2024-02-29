const AdminUpdateSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    adminRoleId: {
      type: 'string'
    }
  },
  additionalProperties: false,
  required: []
}

module.exports = AdminUpdateSchema
