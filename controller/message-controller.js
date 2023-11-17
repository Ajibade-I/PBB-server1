const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const { sendMessageReply } = require("../lib/helpers/messages/reply-message");
const { successResponse } = require("../lib/utility-functions");
const db = require("../models");
const Message = db.Message;

//@Method:POST /message
//@Access:Public
//@Desc: send a message through the contact us page
const contactMessage = async (req, res) => {
  const { firstName, lastName, emailAddress, messageSubject, message } =
    req.body;

  const sendMessage = Message.build({
    firstName,
    lastName,
    emailAddress,
    messageSubject,
    message,
  });

  await sendMessage.save();

  return successResponse(res, "Message sent");
};

//@Method:GET /message
//@Access:Admin
//@Desc: view all messages
const viewMessages = async (req, res) => {
  const messages = await Message.findAll();
  if (!messages) {
    throw new NotFoundError("No messages found");
  }

  return successResponse(res, "Messages ", messages);
};

//@Method:GET /message/new
//@Access:Admin
//@Desc: view new messages
const viewNewMessages = async (req, res) => {
  const messages = await Message.findAll({ where: { isReplied: false } });
  if (!messages) {
    throw new NotFoundError("No messages found");
  }

  return successResponse(res, "Messages ", messages);
};

//@Method:POST /message/reply
//@Access:Admin
//@Desc: reply message
const replyMessage = async (req, res) => {
  const messageId = req.params.messageId;

  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new NotFoundError("Message not found");
  }

  const { replyMessage } = req.body;
  if (!replyMessage) {
    throw new BadRequestError("Reply cannot be empty");
  }

  const reply = `<p>Dear ${message.firstName},</p>` + replyMessage;

  sendMessageReply({
    email: message.emailAddress,
    firstName: message.firstName,
    message: reply,
  });

  return successResponse(res, "Reply sent");
};

module.exports.contactMessage = contactMessage;
module.exports.viewMessages = viewMessages;
module.exports.replyMessage = replyMessage;
module.exports.viewNewMessages = viewNewMessages;
