const express = require("express");
const {
  createCharity,
  getCharities,
} = require("../controller/charity-controller");
const router = express.Router();

router.post("/create-charity", createCharity);
router.get("/", getCharities);

module.exports = router;
