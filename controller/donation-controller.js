const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const { validateDonation } = require("../lib/validation/validate-donation");
const db = require("../models");
const Donation = db.Donations;
const Charity = db.Charity;

const donateCash = async (req, res) => {
  const memberId = req.user.id;
  const charityId = req.params.charityId;

  const error = await validateDonation(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  const { currency, amount, fullName, phoneNumber, emailAddress } = req.body;

  const donation = Donation.build({
    currency,
    amount: parseInt(amount),
    fullName,
    phoneNumber,
    emailAddress,
    memberId,
  });

  await donation.save();

  const charity = await Charity.findByPk(charityId);
  if (!charity) {
    throw new NotFoundError("Charity not found");
  }
  if (charity.status === "completed") {
    throw new BadRequestError("this charity is no longer accepting donations");
  }

  charity.raised += parseInt(amount);
  charity.no_of_sponsors += 1;
  charity.percentage = (charity.raised / charity.goal) * 100;

  if (charity.raised >= charity.goal) {
    charity.status = "completed";
  }

  await charity.save();

  res
    .status(200)
    .json({ success: true, message: "Thank you for your donation" });
};

module.exports.donateCash = donateCash;
