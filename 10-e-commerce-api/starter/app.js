//config
require("dotenv").config();
require("express-async-errors");

//cookies
const cookieParser = require("cookie-parser");

//cors
const cors = require("cors");

const port = process.env.PORT || 3000;

//express
const express = require("express");
const app = express();

//other packages
const morgan = require("morgan"); //Route information
const fileUpload = require("express-fileupload");

//database
const connectDB = require("./db/connect");

//routers
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET)); //For accessing the cookies and argument signs the cookie.
app.use(express.static("../final-front-end/front-end"));
app.use(cors());
app.use(express.static("./public"));
app.use(fileUpload());

//routes

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("ECommerce API");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

//middleware setup
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); //Hit from the existing route only, that's why after not found.

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
