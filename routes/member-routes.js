const express = require("express");
const {
  memberApplication,
  getMembers,
  adminLogin,
  getApplications,
  acceptMembershipApplication,
  rejectMembershipApplication,
} = require("../controller/membercontroller");
const { isLogin, isAdmin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/apply", memberApplication);
router.post("/login", adminLogin);
router.get("/", isLogin, isAdmin, getMembers);
router.get("/applications", isLogin, isAdmin, getApplications);
router.put("/:memberId/accept", isLogin, isAdmin, acceptMembershipApplication);
router.put("/:memberId/reject", isLogin, isAdmin, rejectMembershipApplication);

module.exports = router;
