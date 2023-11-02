const express = require("express");
const { donateCash } = require("../controller/donation-controller");
const { isLogin } = require("../lib/middleware/auth-middleware");
const router = express.Router();

router.post("/:charityId/donate-cash", isLogin, donateCash);

module.exports = router;
