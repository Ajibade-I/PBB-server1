const yup = require("yup");

async function validateSignup(data) {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3)
      .max(12)
      .required("Firstname cannot be empty")
      .label("Firstname"),
    lastName: yup
      .string()
      .min(3)
      .max(12)
      .required("Lastname cannot be empty")
      .label("Lastname"),
    emailAddress: yup
      .string()
      .required("Email address cannot be empty")
      .email("Provide a valid email")
      .label("Email address"),
    phoneNumber: yup.string().min(9).max(11),
    dateOfBirth: yup
      .date()
      .max(new Date(), "Date cannot be in the future")
      .typeError("Invalid date format"),
  });
  try {
    const validateSchema = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors[0];
  }
}

async function validateLogin(data) {
  const schema = yup.object().shape({
    emailAddress: yup
      .string()
      .required("Email address cannot be empty")
      .email("Provide a valid email")
      .label("Email address"),
  });
  try {
    const validateData = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors[0];
  }
}

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;
