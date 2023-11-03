const express = require("express");
const {
  memberSignup,
  getMembers,
  memberLogin,
} = require("../controller/membercontroller");
const { isLogin, isAdmin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/signup", memberSignup);
router.post("/login", memberLogin);
router.get("/", isLogin, isAdmin, getMembers);

module.exports = router;
