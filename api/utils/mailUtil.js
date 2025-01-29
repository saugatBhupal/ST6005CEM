const nodemailer = require("nodemailer");

const username = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;

const sendMail = (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true,
    auth: {
      user: username,
      pass: password,
    },
  });
  const options = {
    from: username,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(options);
};
module.exports = sendMail;
