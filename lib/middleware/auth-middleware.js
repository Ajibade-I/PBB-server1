const jwt = require("jsonwebtoken");
const db = require("../../models");
const UnauthorizedError = require("../errors/unauthorized-error");

const isLogin = async (req, res, next) => {
  const { accessToken } = req.signedCookies;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY);
      req.user = await db.Member.findByPk(decoded.id);

      if (!req.user) {
        throw new Error("Invalid user");
      }
      next(); // Continue if a regular user is logged in
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, msg: "Please login to continue" });
      return;
    }
  } else {
    res.status(401).json({ success: false, msg: "Please login to continue" });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new Unauthorized("You are not an admin");
  }

  next();
};
module.exports.isLogin = isLogin;
module.exports.isAdmin = isAdmin;
