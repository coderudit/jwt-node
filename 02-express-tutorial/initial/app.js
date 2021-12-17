const express = require("express");
const app = express();
const people = require("./routes/people");
const auth = require("./routes/auth");
//static assets
app.use(express.static("../methods-public"));

//parse form data: Regular form
app.use(express.urlencoded({ extended: false }));

//parse json data: JS form
app.use(express.json());

app.use("/api/people", people);
app.use("/login", auth);
app.listen(8080, () => {
  console.log("Server is listening on port 8080.");
});
