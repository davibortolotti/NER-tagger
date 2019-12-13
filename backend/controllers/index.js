var express = require("express"),
  router = express.Router();

router.use(function(req, res, next) {
  if (origins.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

router.use(express.json());
router.use("/project/:project/texts", require("./textsController"));
router.use("/project/:project/types", require("./typesController"));

module.exports = router;

origins = ["http://10.0.0.186:3000", "http://localhost:3000"];
