const AdminCreateSchema = {
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
  required: ['email', 'password', 'isLdap']
}

module.exports = AdminCreateSchema
