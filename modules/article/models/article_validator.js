const AJV = require("ajv");

const ajv = new AJV();

const articleSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    content: {
      type: "string",
    },
    createdBy: {
      type: "string",
      maxLength: 24,
      minLength: 24,
    },
    hashTags: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["title", "createdBy"],
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
};

const validateArticle = ajv.compile(articleSchema);
const validateId = ajv.compile(idSchema);

module.exports = { validateArticle, validateId };
