const AdminUpdateSchema = {
  type: "object",
  properties: {
    ledgerId: {
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

module.exports = AdminUpdateSchema;
