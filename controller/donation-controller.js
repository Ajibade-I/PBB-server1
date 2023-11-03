const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const { successResponse } = require("../lib/utility-functions");
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

  res
    .status(200)
    .json({ success: true, message: "Thank you for your donation" });
};

//@Method : GET /donations
//@Access: admin
const getAllDonations = async (req, res) => {
  const donations = await Donation.findAll();
  if (!donations) {
    res.status(200).json({ success: true, message: "There are no donations" });
    return;
  }
  res.status(200).json({ success: true, message: donations });
};

//@Method : GET /donations/member
const getMyDonations = async (req, res) => {
  const memberId = req.user.id;

  const memberDonations = await Donation.findAll({
    where: { memberId: memberId },
  });
  if (memberDonations.length === 0) {
    throw new NotFoundError("You have no donations");
  }
  const totalAmountDonated = memberDonations
    .map((donation) => donation.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  res
    .status(200)
    .json({ success: true, message: memberDonations, totalAmountDonated });
};

//@Method : GET /donations/charities

const getMyCharities = async (req, res) => {
  const memberId = req.user.id;
  const donations = await Donation.findAll({ where: { memberId: memberId } });
  if (!donations) {
    throw new NotFoundError("You have not made any donations");
  }

  const charityIds = donations.map((donation) => donation.charityId);
  const charityPromises = charityIds.map((charity) =>
    Charity.findByPk(charity)
  );

  const charities = await Promise.all(charityPromises);

  return successResponse(res, "Charities you have donated to", charities);
};

module.exports.donateCash = donateCash;
module.exports.getAllDonations = getAllDonations;
module.exports.getMyDonations = getMyDonations;
module.exports.getMyCharities = getMyCharities;
