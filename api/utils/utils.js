const crypto = require("crypto");
const bcrypt = require("bcryptjs");

async function generateDefaultPassword() {
  var password = crypto.randomBytes(10).toString("hex");
  password = await encrypt(password);
  return password;
}

async function encrypt(content) {
  const salt = await bcrypt.genSalt(10);
  encrypted_content = await bcrypt.hash(content, salt);
  return encrypted_content;
}

function generateOtp() {
  const otp = crypto.randomInt(100000, 1000000);
  return otp.toString();
}

function generateOtpExpiry() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  return date;
}

async function comparePasswords(enteredPassword, actualPassword) {
  console.log(enteredPassword, actualPassword);
  return await bcrypt.compare(enteredPassword, actualPassword);
}
module.exports = {
  generateDefaultPassword,
  encrypt,
  generateOtp,
  generateOtpExpiry,
  comparePasswords,
};
