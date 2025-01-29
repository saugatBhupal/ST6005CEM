const asyncHandler = require("../middlewares/async");
const User = require("../models/user");

exports.updateProfileImage = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
});
