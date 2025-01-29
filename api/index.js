const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const connectDB = require("./config/db");

dotenv.config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//================== Routes =================
const userRoute = require("./routes/userRoute");

//===========================================

//===================Mount Routers===========
app.use("/api/v1/auth", userRoute);
//===========================================

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

const server = app.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}`)
);
process.on("unhandlesRejection", (err, promise) => {
  console.log(`Unhandles Rejection at:, promise, "Reason", err`.red);
});
