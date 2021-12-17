const express = require("express");
const app = express();
const logger = require("../logger");
const authorize = require("../authorize");
const morgan = require("morgan");

//app.use([logger, authorize]);
//app.use("/api", logger);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(8080, () => {
  console.log("Listening on port 8080.");
});
