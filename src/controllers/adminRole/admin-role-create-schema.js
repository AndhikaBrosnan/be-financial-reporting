const AdminRoleCreateSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    adminPermissionIds: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  additionalProperties: false,
  required: ['name', 'adminPermissionIds']
}

module.exports = AdminRoleCreateSchema
