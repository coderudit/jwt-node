const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.get("*", (req, res) => {
  res.status(404).send("Resource not found.");
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
