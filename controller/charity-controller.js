const BadRequestError = require("../lib/errors/badrequest");
const {
  validateCharityCreation,
} = require("../lib/validation/validate-charity");
const db = require("../models");
const Charity = db.Charity;
const Donation = db.Donations;

//@Method : POST /charity/"
const createCharity = async (req, res) => {
  const error = await validateCharityCreation(req.body);
  if (error) {
    throw new BadRequestError(error);
  }
  const { name, goal, status, raised, no_of_sponsors, percentage } = req.body;

  const nameExists = await Charity.findOne({ where: { name: name } });
  if (nameExists) {
    throw new BadRequestError("Charity name is already used");
  }

  const charity = Charity.build({
    name,
    goal: parseInt(goal),
    status,
    raised,
    no_of_sponsors,
    percentage,
  });

  await charity.save();

  res.status(200).json({ message: "Charity initiated" });
};

//@Method : GET /charity
const getCharities = async (req, res) => {
  const charities = await Charity.findAll();
  if (!charities) {
    res.status(404).json({ message: "There are no charities " });
    return;
  }
  res.status(200).json({ success: true, message: charities });
};

//@Method : DELETE /charity/:charityId"
const deleteCharity = async (req, res) => {
  const charityId = req.params.charityId;
  const charity = await Charity.destroy({ where: { id: charityId } });

  res
    .status(200)
    .json({ success: true, message: "Charity deleted succesfully" });
};

//@Method:GET /charity/:charityId/donations
const getCharityDonations = async (req, res) => {
  const charityId = req.params.charityId;

  const donations = await Donation.findAll({ where: { charityId: charityId } });
  res.status(200).json({ succes: true, message: donations });
};
//test handler

module.exports.createCharity = createCharity;
module.exports.getCharities = getCharities;
module.exports.deleteCharity = deleteCharity;
module.exports.getCharityDonations = getCharityDonations;
