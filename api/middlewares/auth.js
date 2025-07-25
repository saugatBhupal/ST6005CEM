const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/user");

// Authentication middleware
exports.auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check header or cookie for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // Check if user changed password after token was issued
    if (
      user.passwordChangedAt &&
      decoded.iat < user.passwordChangedAt.getTime() / 1000
    ) {
      return res
        .status(401)
        .json({
          message: "User recently changed password. Please login again",
        });
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token. Please login again" });
  }
});

// Role authorization middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};
