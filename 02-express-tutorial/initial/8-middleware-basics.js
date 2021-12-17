const express = require("express");
const app = express();

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next(); //or res.send("Directly call res.send();");
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(8080, () => {
  console.log("Listening on port 8080.");
});
