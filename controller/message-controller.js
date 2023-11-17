const NotFoundError = require("../lib/errors/notfound-error");
const { sendMessageReply } = require("../lib/helpers/messages/reply-message");
const { successResponse } = require("../lib/utility-functions");
const db = require("../models");
const Message = db.Message;

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

const viewMessages = async (req, res) => {
  const messages = await Message.findAll();
  if (!messages) {
    throw new NotFoundError("No messages found");
  }

  return successResponse(res, "Messages ", messages);
};

const viewNewMessages = async (req, res) => {
  const messages = await Message.findAll({ where: { isReplied: false } });
  if (!messages) {
    throw new NotFoundError("No messages found");
  }

  return successResponse(res, "Messages ", messages);
};

const replyMessage = async (req, res) => {
  const messageId = req.params.messageId;

  const message = await Message.findByPk(messageId);
  if (!message) {
    throw new NotFoundError("Message not found");
  }

  const { replyMessage } = req.body;

  const reply = `Dear ${message.firstName}` + replyMessage;

  sendMessageReply({
    email: message.emailAddress,
    firstName: message.firstName,
    message: reply,
  });

  return successResponse(res, "Reply sent");
};
