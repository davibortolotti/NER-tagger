var Ajv = require("ajv");
var ajv = new Ajv({ allErrors: true });

var schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      text: {
        type: "string"
      },
      annotations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            start: {
              type: "integer"
            },
            end: {
              type: "integer"
            },
            type: {
              type: "string"
            }
          }
        },
        required: ["start", "end", "type"]
      }
    },
    required: ["text"]
  }
};

module.exports.validateJsonTexts = ajv.compile(schema);
