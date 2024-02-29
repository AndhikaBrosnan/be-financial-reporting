const RegisterSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      minLength: 8
    },
    isLdap: {
      type: 'boolean'
    }
  },
  additionalProperties: false,
  required: ['email', 'isLdap']
}

module.exports = RegisterSchema
