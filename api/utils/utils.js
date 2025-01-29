const crypto = require("crypto");
const bcrypt = require("bcryptjs");

async function generateDefaultPassword() {
  var password = crypto.randomBytes(10).toString("hex");
  password = await encrypt(password);
  console.log("pass", password);
  return password;
}

async function encrypt(content) {
  const salt = await bcrypt.genSalt(10);
  encrypted_content = await bcrypt.hash(content, salt);
  return encrypted_content;
}

function generateOtp() {
  var otp = crypto.randomBytes(3).toString("hex");
  return otp;
}

function generateOtpExpiry() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  return date;
}
module.exports = {
  generateDefaultPassword,
  encrypt,
  generateOtp,
  generateOtpExpiry,
};
