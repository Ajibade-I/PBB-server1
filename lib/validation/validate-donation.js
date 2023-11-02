const yup = require("yup");

async function validateDonation(data) {
  const schema = yup.object().shape({
    currency: yup.string().required("Currency is required").label("Currency"),
    amount: yup.string().required("Amount is required").label("Amount"),
    fullName: yup.string().min(5).max(50).label("Fullname"),
    phoneNumber: yup.string().min(5).max(50).label("Phone number"),
    emailAddress: yup.string().min(5).max(50).label("Email address"),
  });
  try {
    const validateData = await schema.validate(data);
    return null;
  } catch (error) {
    return error?.errors[0];
  }
}

module.exports.validateDonation = validateDonation;
