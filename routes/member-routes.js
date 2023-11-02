const express = require("express");
const {
  memberSignup,
  getMembers,
  memberLogin,
} = require("../controller/membercontroller");
const router = express.Router();

router.post("/signup", memberSignup);
router.post("/login", memberLogin);
router.get("/", getMembers);

module.exports = router;
