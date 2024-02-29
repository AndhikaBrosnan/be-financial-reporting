const AdminCreateSchema = {
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
  required: ['email', 'password', 'adminRoleId']
}

module.exports = AdminCreateSchema
