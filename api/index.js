const { app, server } = require("./config/socketConfig");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require("cloudinary");
const connectDB = require("./config/db");
const multiparty = require("connect-multiparty");

dotenv.config({
  path: "./config/config.env",
});

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multiparty());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//================== Routes =================
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const conversationRoute = require("./routes/conversationRoute");
const jobRoute = require("./routes/jobRoute");
const projectRoute = require("./routes/projectRoute");
//===========================================

//===================Mount Routers===========
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/project", projectRoute);
//===========================================

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

server.listen(
  PORT,
  console.log(`Server running in ${MODE} mode on port ${PORT}`)
);
process.on("unhandlesRejection", (err, promise) => {
  console.log(`Unhandles Rejection at:, promise, "Reason", err`.red);
});
