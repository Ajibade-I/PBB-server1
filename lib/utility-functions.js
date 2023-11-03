const successResponse = (res, message, data = null) => {
  const response = {
    success: true,
    message: message,
  };

  if (data !== null) {
    response.data = data;
  }
  res.status(200).json(response);
};

module.exports.successResponse = successResponse;
