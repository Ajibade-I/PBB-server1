const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const { successResponse, pagenation } = require("../lib/utility-functions");
const { validateDonation } = require("../lib/validation/validate-donation");
const db = require("../models");
const Donation = db.Donations;
const Charity = db.Charity;

//@Method : POST /donations/:charityId/donate-cash"
const donateCash = async (req, res) => {
  const memberId = req.user.id;
  const charityId = req.params.charityId;

  const error = await validateDonation(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { currency, amount, fullName, phoneNumber, emailAddress } = req.body;

  const charity = await Charity.findByPk(charityId);
  if (!charity) {
    throw new NotFoundError("Charity not found");
  }
  if (charity.status === "completed") {
    throw new BadRequestError("this charity is no longer accepting donations");
  }
  //test completed

  charity.raised += parseInt(amount);
  charity.no_of_sponsors += 1;
  charity.percentage = (charity.raised / charity.goal) * 100;

  if (charity.raised >= charity.goal) {
    charity.status = "completed";
  }

  await charity.save();

  const donation = Donation.build({
    currency,
    amount: parseInt(amount),
    fullName,
    phoneNumber,
    emailAddress,
    memberId,
    charityId,
  });

  await donation.save();

  return successResponse(res, "Thank you for your donation");
};

//@Method : GET /donations
//@Access: admin
const getAllDonations = async (req, res) => {
  const page = req.query.page;

  let donations = await Donation.findAll();
  if (!donations) {
    throw new NotFoundError("There are no donations");
  }
  if (page) {
    donations = pagenation(page, donations);
  }

  return successResponse(res, "", donations);
};

//@Method : GET /donations/member
const getDonationHistory = async (req, res) => {
  const page = req.query;
  const memberId = req.user.id;

  let memberDonations = await Donation.findAll({
    where: { memberId: memberId },
  });
  if (memberDonations.length === 0) {
    throw new NotFoundError("You have no donations");
  }

  const totalAmountDonated = memberDonations
    .map((donation) => donation.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  if (page) {
    memberDonations = pagenation(page, memberDonations);
  }
  return successResponse(res, "Your donations", [
    memberDonations,
    totalAmountDonated,
  ]);
};

//@Method : GET /donations/charities

const getMyCharities = async (req, res) => {
  const page = req.query.page;
  const memberId = req.user.id;
  const donations = await Donation.findAll({ where: { memberId: memberId } });
  if (!donations) {
    throw new NotFoundError("You have not made any donations");
  }

  const charityIds = donations.map((donation) => donation.charityId);
  const charityPromises = charityIds.map((charity) =>
    Charity.findByPk(charity)
  );

  let charities = await Promise.all(charityPromises);

  if (page) {
    charities = pagenation(page, charities);
  }
  return successResponse(res, "Charities you have donated to", charities);
};

module.exports.donateCash = donateCash;
module.exports.getAllDonations = getAllDonations;
module.exports.getDonationHistory = getDonationHistory;
module.exports.getMyCharities = getMyCharities;
