const asyncHandler = require("../middlewares/async");

exports.getStudents = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "he",
  });
});
