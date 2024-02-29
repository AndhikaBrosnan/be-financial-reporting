const AdminCreateSchema = {
  type: "object",
  properties: {
    subTask: {
      type: "string",
    },
    todoId: {
      type: "string",
    },
  },
  additionalProperties: false,
};

module.exports = AdminCreateSchema;
