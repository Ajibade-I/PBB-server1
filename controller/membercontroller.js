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
const {
  sendApplicationAccepted,
} = require("../lib/helpers/messages/membership-accepted");
const {
  sendApplicationRejected,
} = require("../lib/helpers/messages/membershipRejected");
const privateKey = process.env.JWT_PRIVATE_KEY;

//@Method:POST /member/signup
//@Access: public
//@Desc: submit membership application
const memberApplication = async (req, res, next) => {
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

//@Method:POST /member/admin/login
//@Access: public
//@Desc: admin login
const adminLogin = async (req, res) => {
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
//@Desc : get all members
const getMembers = async (req, res) => {
  const page = req.query.page;

  let members = await Member.findAll({ where: { status: "approved" } });
  if (!members) {
    throw new NotFoundError("No members found");
  }
  if (page) {
    members = pagenation(page, members);
  }
  return successResponse(res, "", members);
};
//@Method:GET /members
//@Access:admin
//@Desc : get all members
const getApplications = async (req, res) => {
  const page = req.query.page;

  let members = await Member.findAll({ where: { status: "pending" } });
  if (!members) {
    throw new NotFoundError("No members found");
  }
  if (page) {
    members = pagenation(page, members);
  }
  return successResponse(res, "Applicants", members);
};

//@Method:PUT members/:memberId/accept
//@Access:admin
//@Desc : accept or reject an application
const acceptMembershipApplication = async (req, res) => {
  const memberId = req.params.memberId;

  const acceptMember = await Member.findByPk(memberId);
  acceptMember.status = "approved";
  await acceptMember.save();

  sendApplicationAccepted({
    email: acceptMember.emailAddress,
    firstName: acceptMember.firstName,
  });

  return successResponse(res, "Application accepted");
};
//@Method:PUT members/:memberId/reject
//@Access:admin
//@Desc : reject an application
const rejectMembershipApplication = async (req, res) => {
  const memberId = req.params.memberId;

  const rejectedMember = await Member.findByPk(memberId);
  rejectedMember.status = "rejected";
  await rejectedMember.save();

  sendApplicationRejected({
    email: rejectedMember.emailAddress,
    firstName: rejectedMember.firstName,
  });

  return successResponse(res, "Application rejected");
};

module.exports.memberApplication = memberApplication;
module.exports.getMembers = getMembers;
module.exports.getApplications = getApplications;
module.exports.adminLogin = adminLogin;
module.exports.acceptMembershipApplication = acceptMembershipApplication;
module.exports.rejectMembershipApplication = rejectMembershipApplication;
