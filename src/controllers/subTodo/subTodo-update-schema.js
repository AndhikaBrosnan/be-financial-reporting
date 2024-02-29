const AdminUpdateSchema = {
  type: "object",
  properties: {
    subTask: {
      type: "string",
    },
    isDone: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};

module.exports = AdminUpdateSchema;
