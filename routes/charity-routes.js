const express = require("express");
const {
  createCharity,
  getCharities,
  deleteCharity,
  getCharityDonations,
  updateCharity,
} = require("../controller/charity-controller");
const { isLogin, isAdmin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/", isLogin, isAdmin, createCharity);
router.get("/", isLogin, isAdmin, getCharities);
router.delete("/:charityId", isLogin, isAdmin, deleteCharity);
router.get("/:charityId/donations", isLogin, isAdmin, getCharityDonations);
router.put("/:charityId/update", isLogin, isAdmin, updateCharity);

module.exports = router;
