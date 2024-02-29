const AdminUpdateSchema = {
  type: "object",
  properties: {
    task: {
      type: "string",
    },
    isDone: {
      type: "boolean",
    },
    priority: {
      type: "number",
    },
  },
  additionalProperties: false,
  required: [],
};

module.exports = AdminUpdateSchema;
