const express = require("express");
const {
  donateCash,
  getAllDonations,
} = require("../controller/donation-controller");
const router = express.Router();

router.post("/:charityId/donate-cash", donateCash);
router.get("/", getAllDonations);

module.exports = router;
