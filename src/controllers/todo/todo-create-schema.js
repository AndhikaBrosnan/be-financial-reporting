const AdminCreateSchema = {
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
  required: ["task"],
};

module.exports = AdminCreateSchema;
