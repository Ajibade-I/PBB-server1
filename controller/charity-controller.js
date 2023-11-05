const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const { successResponse, pagenation } = require("../lib/utility-functions");
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

  return successResponse(res, "Charity initiated");
};

//@Method : GET /charity
const getCharities = async (req, res) => {
  const page = req.query.page;
  const status = req.query.status;

  let charities;
  if (status) {
    charities = await Charity.findAll({ where: { status: status } });
    if (charities.length === 0) {
      throw new NotFoundError(`There are no ${status} charities`);
    }
  } else {
    charities = await Charity.findAll();
    if (!charities) {
      throw new NotFoundError("There are no charities");
    }
  }

  if (page) {
    charities = pagenation(page, charities);
  }
  const message = status ? `${status} charities` : "Charities";

  return successResponse(res, message, charities);
};

//test handler

//@Method : DELETE /charity/:charityId"
const deleteCharity = async (req, res) => {
  const charityId = req.params.charityId;
  const rowsDeleted = await Charity.destroy({ where: { id: charityId } });

  if (rowsDeleted === 0) {
    // No rows were deleted, indicating that the charity with the given ID doesn't exist.
    throw new NotFoundError("Charity not found");
  }
  return successResponse(res, "Charity deleted succesfully");
};

//@Method:GET /charity/:charityId/donations
const getCharityDonations = async (req, res) => {
  const charityId = req.params.charityId;

  const donations = await Donation.findAll({ where: { charityId: charityId } });

  return successResponse(res, "", donations);
};

module.exports.createCharity = createCharity;
module.exports.getCharities = getCharities;
module.exports.deleteCharity = deleteCharity;
module.exports.getCharityDonations = getCharityDonations;
