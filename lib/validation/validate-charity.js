const yup = require("yup");

async function validateCharityCreation(data) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5)
      .max(50)
      .required("Name cannot be empty")
      .label("Name"),
    goal: yup
      .string()
      .required("Goal amount cannot be empty")
      .label("Goal amount"),
  });
  try {
    const validateData = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors[0];
  }
}

module.exports.validateCharityCreation = validateCharityCreation;
