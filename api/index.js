const { app, server } = require("./config/socketConfig");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require("cloudinary");
const connectDB = require("./config/db");
const multiparty = require("connect-multiparty");

// Security dependencies
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const csurf = require("csurf");
const { body, validationResult, param, query } = require("express-validator");

dotenv.config({
  path: "./config/config.env",
});

// Set security HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

// Essential middleware (order matters)
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Allow cookies with CORS
  })
);
app.use(multiparty());

// CSRF protection (after cookie and body parsers)
app.use(csurf({ cookie: true }));

// Send CSRF token to client
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: false, // Allow JavaScript access to CSRF token
  });
  next();
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Example global input validation middleware (can be customized per route)
// app.post('/api/v1/some-endpoint', [
//   body('email').isEmail().normalizeEmail(),
//   body('username').isAlphanumeric().trim().escape(),
// ], (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// });

// CSRF error handler
app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  // handle CSRF token errors here
  res.status(403).json({ message: "Invalid CSRF token" });
});

//================== Routes =================
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const conversationRoute = require("./routes/conversationRoute");
const jobRoute = require("./routes/jobRoute");
const projectRoute = require("./routes/projectRoute");
const reviewRoute = require("./routes/reviewRoute");
//===========================================

//===================Mount Routers===========
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/review", reviewRoute);
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
module.exports = { app, server };
