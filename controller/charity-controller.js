const { Op } = require("sequelize");
const BadRequestError = require("../lib/errors/badrequest");
const NotFoundError = require("../lib/errors/notfound-error");
const { successResponse, pagenation } = require("../lib/utility-functions");
const {
  validateCharityCreation,
  validateCharityUpdate,
} = require("../lib/validation/validate-charity");
const db = require("../models");
const Charity = db.Charity;
const Donation = db.Donations;

//@Method : POST /charity/"
//@Access : admin
//@Desc: create a charity
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
//@Access: admin
//@Desc: get all charities(with filter options if required)
const getCharities = async (req, res) => {
  const page = req.query.page;
  const status = req.query.status;
  const name = req.query.name;
  let charities;

  //check if status and name queries are provided
  if (status && name) {
    charities = await Charity.findAll({
      where: {
        [Op.and]: [{ status: status }, { name: { [Op.like]: `%${name}%` } }],
      },
    });
    if (charities.length === 0) {
      return successResponse(
        res,
        `No charities with that status or name found`
      );
    } //check only status is provided
  } else if (status && !name) {
    charities = await Charity.findAll({ where: { status: status } });
    if (charities.length === 0) {
      return successResponse(res, `No ${status} charities found`);
    } //check if only name is provided
  } else if (name && !status) {
    charities = await Charity.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });
    if (charities.length === 0) {
      return successResponse(res, `${name} charity not found`);
    }
  } else {
    charities = await Charity.findAll();
    if (!charities) {
      throw new NotFoundError("No charities found");
    }
  }
  //pagenate if queried
  if (page) {
    charities = pagenation(page, charities);
  }
  const message = status ? `${status} charities` : "Charities";

  return successResponse(res, message, charities);
};

//@Method : DELETE /charity/:charityId"
//@Access:admin
//@Desc: to delete a charity
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
//@Access: admin
//@Desc: get all donations made to a given charity
const getCharityDonations = async (req, res) => {
  const charityId = req.params.charityId;
  const order = req.query.order;
  let donations;
  if (order) {
    donations = await Donation.findAll({
      where: { charityId: charityId },
      order: [["amount", order]],
    });
  } else {
    donations = await Donation.findAll({ where: { charityId: charityId } });
  }
  //test handler
  return successResponse(res, "", donations);
};

//@Method:PUT /charity/:charityId/update
//@Access: admin
//@Desc : update charities

const updateCharity = async (req, res) => {
  const charityId = req.params.charityId;

  const charity = await Charity.findByPk(charityId);
  if (!charity) {
    throw new NotFoundError("Charity not found");
  }
  const error = await validateCharityUpdate(req.body);
  if (error) {
    throw new BadRequestError(error);
  }

  Charity.update(req.body, { where: { id: charityId } })
    .then((result) => {
      // 'result' contains information about the number of updated rows
      console.log(`Updated ${result[0]} rows`);
    })
    .catch((error) => {
      console.error("Error updating records:", error);
    });

  return successResponse(res, "Charity updated succesfully");
};

module.exports.createCharity = createCharity;
module.exports.getCharities = getCharities;
module.exports.deleteCharity = deleteCharity;
module.exports.getCharityDonations = getCharityDonations;
module.exports.updateCharity = updateCharity;
