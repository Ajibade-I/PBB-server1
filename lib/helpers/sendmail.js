const nodemailer = require("nodemailer");
const nodemailerconfig = require("./nodemailerconfig");

const userEmail = process.env.SMTP_MAIL;

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerconfig);
  return transporter.sendMail({
    from: userEmail,
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;
