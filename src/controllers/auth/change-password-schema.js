const ChangePasswordSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string'
    },
    newPassword: {
      type: 'string',
      minLength: 8
    },
    newPasswordConfirmation: {
      type: 'string',
      minLength: 8
    }
  },
  additionalProperties: false,
  required: ['userId', 'newPassword', 'newPasswordConfirmation']
}

module.exports = ChangePasswordSchema
