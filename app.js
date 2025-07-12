const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
  });
});
