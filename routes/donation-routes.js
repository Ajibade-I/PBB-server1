const express = require("express");
const {
  donateCash,
  getAllDonations,
} = require("../controller/donation-controller");
const { isLogin, isAdmin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/:charityId/donate-cash", donateCash);
router.get("/", isLogin, isAdmin, getAllDonations);

module.exports = router;
