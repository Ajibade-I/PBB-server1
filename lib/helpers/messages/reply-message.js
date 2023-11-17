const sendEmail = require("../sendmail");

async function sendMessageReply({ email, firstName, message }) {
  return sendEmail({
    to: email,
    subject: "Message reply",
    html: message,
  });
}
module.exports.sendMessageReply = sendMessageReply;
