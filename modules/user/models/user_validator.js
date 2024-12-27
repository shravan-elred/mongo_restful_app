const Ajv = require("ajv");
const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    first_name: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
  required: ["firstName", "email", "gender"],
  additionalProperties: false,
};

const idSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 24,
      minLength: 24,
    },
  },
  required: ["id"],
  additionalProperties: false,
};

const validateUser = ajv.compile(userSchema);
const validateId = ajv.compile(idSchema);

module.exports = { validateUser, validateId };
