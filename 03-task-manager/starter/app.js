const express = require("express");
const app = express();
const port = 8080;
const taskRoutes = require("./routes/tasks");

//routes
app.get("/hello", (req, res) => {
  res.status(200).send("Task Manager app.");
});

app.get("/api/v1/tasks", taskRoutes);

app.listen(port, console.log(`Server is listening on ${port}`));
