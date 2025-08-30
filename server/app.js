const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const check = require("./middlewares/check");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    app: "ShopiFyzz API 🛒",
    description:
      "🚀 Scalable full-stack e-commerce application with authentication, order management, and modern UI.",
    author: {
      name: "Apurv Maurya",
      github: "https://github.com/gitApurv",
      portfolio: "https://my-portfolio-eight-theta-70.vercel.app/",
      linkedin: "https://www.linkedin.com/in/apurvmaurya",
    },
    version: "1.0.0",
    status: "✅ Running",
    serverTime: new Date().toLocaleString(),
  });
});

app.use("/api", check);
app.use("/admin", adminRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(authRoutes);
app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
  });
});
