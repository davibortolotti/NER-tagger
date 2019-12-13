var Ajv = require("ajv");
var ajv = new Ajv({ allErrors: true });

var schema = {
  type: "object",
  properties: {
    type: {
      type: "string"
    },
    color: {
      type: "object",
      properties: {
        r: {
          type: "integer"
        },
        g: {
          type: "integer"
        },
        b: {
          type: "integer"
        }
      }
    }
  }
};

module.exports.validateJsonType = ajv.compile(schema);
