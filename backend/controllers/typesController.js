var express = require("express"),
  router = express.Router({ mergeParams: true }),
  fileUpload = require("express-fileupload"),
  validate = require("../schemas/typeSchema"),
  typeStore = require("../store/typeStore"),
  textStore = require("../store/textSTore");

router.use(fileUpload());

router.post("/", function(req, res) {
  newType = req.body;
  var valid = validate.validateJsonType(newType);
  if (valid) {
    newType.project = parseInt(req.params.project);
    typeStore.createType(newType);

    res.send({ created: newType });
  } else {
    res.status(400).send({ error: "Json content is not valid." });
  }
});

router.get("/", function(req, res) {
  typeStore.getAllProjectTypes(parseInt(req.params.project)).then(types => {
    res.send(types);
  });
});

router.delete("/:id", async function(req, res) {
  await textStore.deleteFromType(parseInt(req.params.project), req.params.id);
  typeStore.deleteType(req.params.id);
  res.send({ deleted: req.params.id });
});

module.exports = router;
