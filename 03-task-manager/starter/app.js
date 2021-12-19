const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const taskRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
