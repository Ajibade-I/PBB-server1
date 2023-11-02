const BadRequestError = require("../lib/errors/badrequest");
const {
  validateCharityCreation,
} = require("../lib/validation/validate-charity");
const db = require("../models");
const Charity = db.Charity;

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

const getCharities = async (req, res) => {
  const charities = await Charity.findAll();
  if (!charities) {
    res.status(404).json({ message: "There are no charities " });
    return;
  }
  res.status(200).json({ success: true, message: charities });
};

module.exports.createCharity = createCharity;
module.exports.getCharities = getCharities;
