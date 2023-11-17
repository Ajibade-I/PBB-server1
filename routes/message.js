const express = require("express");
const {
  contactMessage,
  viewMessages,
  viewNewMessages,
  replyMessage,
} = require("../controller/message-controller");
const { isLogin, isAdmin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/message", contactMessage);
router.get("/message", isLogin, isAdmin, viewMessages);
router.get("/message/new", isLogin, isAdmin, viewNewMessages);
router.post("/message/:messageId/reply", isLogin, isAdmin, replyMessage);

module.exports = router;
