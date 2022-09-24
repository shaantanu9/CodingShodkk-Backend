const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// Create a schema that will be used to validate the request body

const bookmarkSchema = {
  type: "object",
  properties: {
    url: {
      type: "string",
      minLength: 10,
      //   must have http or https and // in the url and
      pattern: "^(https?:\\/\\/)?", // protocol
      // "/^https?://(?:www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/",
    },
    title: {
      type: "string",
      minLength: 2,
      maxLength: 20,
    },
    description: {
      type: "string",
      minLength: 2,
    },
    tags: {
      type: "array",
      items: {
        type: "string",
        minLength: 2,
        maxLength: 20,
      },
    },
  },
  required: ["url", "title"],

  additionalProperties: false,
};

module.exports = bookmarkSchema;
// Create a middleware that will be used to validate the request body
