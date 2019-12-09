const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var Ajv = require("ajv");
var ajv = new Ajv({ allErrors: true });

var schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      text: {
        type: "string"
      }
    },
    required: ["text"]
  }
};

var validate = ajv.compile(schema);

test([{ text: "abc", bar: 2 }]);
test({ foo: 2, bar: 4 });

function test(data) {
  var valid = validate(data);
  if (valid) console.log("Valid!");
  else console.log("Invalid: " + ajv.errorsText(validate.errors));
}

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://192.168.99.100:27017/", function(err, database) {
  if (err) {
    throw err;
  }
  console.log("Connected to mongodb");
  db = database.db("texts");
  //   console.log(db.collection("testes").findOne());
});

app.use(express.json());
app.use(fileUpload());

app.get("/", function(req, res) {
  db.collection("testes")
    .findOne()
    .then(function(first) {
      console.log(first);
      res.send(first.teste);
    });
});

app.post("/insertTextFromFile", function(req, res) {
  s = req.files.file.data.toString();
  data = JSON.parse(s);

  var valid = validate(data);
  if (valid) {
    console.log(data);
    db.collection("testes").insertMany(data);
    res.status(201).send({ message: "thanks!" });
  } else {
    res.status(400);
  }
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
