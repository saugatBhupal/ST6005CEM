const jwt = require("jsonwebtoken");

function getSignedJwtToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}
module.exports = {
  getSignedJwtToken,
};
