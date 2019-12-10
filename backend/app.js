const express = require("express");
const app = express();

app.use(require("./controllers"));

app.listen(3001, function() {
  console.log("App Pangea is running on port 3001");
});
