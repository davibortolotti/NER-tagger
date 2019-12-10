var express = require("express"),
  router = express.Router({ mergeParams: true }),
  fileUpload = require("express-fileupload"),
  fs = require("fs"),
  validate = require("../schemas/textSchema"),
  textStore = require("../store/textStore");

router.use(fileUpload());

router.get("/unannotated", function(req, res) {
  textStore
    .getUnannotatedTexts(req.params.project)
    .then(texts => res.send(texts));
});

router.post("/fromFile", function(req, res) {
  s = req.files.file.data.toString();
  try {
    data = JSON.parse(s);
  } catch {
    res.status(400).send({ message: "File is not a valid json" });
    return;
  }
  var valid = validate.validateJsonTexts(data);
  console.log(valid);
  if (valid === true) {
    data.forEach(function(part, index, theArray) {
      theArray[index].project = parseInt(req.params.project);
    });
    textStore.insertTexts(data);
    res.status(201).send({ message: "thanks!", inserted: data });
  } else {
    res
      .status(400)
      .send({ message: "json format is not valid. Please check:" });
  }
});

module.exports = router;
