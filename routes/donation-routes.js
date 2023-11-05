const express = require("express");
const {
  donateCash,
  getAllDonations,
  getMyCharities,
  getDonationHistory,
} = require("../controller/donation-controller");
const { isLogin, isAdmin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/:charityId/donate-cash", isLogin, donateCash);
router.get("/", isLogin, isAdmin, getAllDonations);
router.get("/history", isLogin, getDonationHistory);
router.get("/charities", isLogin, getMyCharities);

module.exports = router;
