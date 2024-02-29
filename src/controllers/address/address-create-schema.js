const AddressCreateSchema = {
  type: 'object',
  properties: {
    urban: {
      type: 'string'
    },
    district: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    province: {
      type: 'string'
    },
    postalCode: {
      type: 'string'
    },
    addressDetail: {
      type: 'string'
    },
    note: {
      type: 'string'
    },
    isSelected: {
      type: 'boolean'
    }
  },
  additionalProperties: false,
  required: [
    'urban',
    'district',
    'city',
    'province',
    'postalCode',
    'addressDetail',
    'note',
    'isSelected'
  ]
}

module.exports = AddressCreateSchema
