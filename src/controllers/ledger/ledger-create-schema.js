const AdminCreateSchema = {
  type: "object",
  properties: {
    userId: {
      type: "string",
    },
    activity: {
      type: "string",
    },
    type: {
      type: "string",
    },
    amount: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: ["activity"],
};

module.exports = AdminCreateSchema;
