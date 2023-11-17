const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const {
  sendSuccessfulDonation,
} = require("../lib/helpers/messages/donation-succesfull");
const { successResponse, pagenation } = require("../lib/utility-functions");
const { validateDonation } = require("../lib/validation/validate-donation");
const db = require("../models");
const Donation = db.Donations;
const Charity = db.Charity;

//@Method : POST /donations/:charityId/donate-cash"
//@Access: public
//@Desc: donate cash
const donateCash = async (req, res) => {
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
  if (charity.percentage > 100) {
    charity.percentage = 100;
  }
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

  sendSuccessfulDonation({ email: emailAddress, firstName });
  return successResponse(res, "Thank you for your donation");
};

//@Method : GET /donations
//@Access: admin
//@Desc : get all the donations made to every charity
const getAllDonations = async (req, res) => {
  const page = req.query.page;

  let donations = await Donation.findAll();
  if (!donations) {
    throw new NotFoundError("There are no donations");
  }
  if (page) {
    donations = pagenation(page, donations);
  }

  return successResponse(res, "Donations", donations);
};

module.exports.donateCash = donateCash;
module.exports.getAllDonations = getAllDonations;
