const {
  validateSignup,
  validateLogin,
} = require("../lib/validation/validate-members");
const BadRequestError = require("../lib/errors/badrequest");
const db = require("../models");
const Member = db.Member;
const jwt = require("jsonwebtoken");
const { successResponse, pagenation } = require("../lib/utility-functions");
const NotFoundError = require("../lib/errors/notfound-error");
const privateKey = process.env.JWT_PRIVATE_KEY;

//@Method:POST /member/signup
const memberSignup = async (req, res, next) => {
  const error = await validateSignup(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    dateOfBirth,
    occupation,
    residentialAddress,
    role,
  } = req.body;
  const emailExists = await Member.findOne({
    where: { emailAddress: emailAddress },
  });
  if (emailExists) {
    throw new BadRequestError("User already exists");
  }

  const member = Member.build({
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    dateOfBirth,
    occupation,
    residentialAddress,
    role,
  });

  await member.save();
  return successResponse(res, "Signup sucessfull");
};

//@Method:POST /member/login
const memberLogin = async (req, res) => {
  const error = await validateLogin(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { emailAddress } = req.body;

  const member = await Member.findOne({
    where: { emailAddress: emailAddress },
  });
  if (!member) {
    throw new BadRequestError("Invalid email");
  }

  const payload = {
    id: member.id,
    emailAddress,
  };

  const token = jwt.sign(payload, privateKey);
  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  return successResponse(res, "Log in successfull");
};

//@Method:GET /members
//@Access:admin
const getMembers = async (req, res) => {
  const page = req.query.page;

  let members = await Member.findAll();
  if (!members) {
    throw new NotFoundError("There no members");
  }
  if (page) {
    members = pagenation(page, members);
  }
  return successResponse(res, "", members);
};

module.exports.memberSignup = memberSignup;
module.exports.getMembers = getMembers;
module.exports.memberLogin = memberLogin;
