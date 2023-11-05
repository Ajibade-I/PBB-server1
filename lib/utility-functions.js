const successResponse = (res, message, data = null) => {
  const response = {
    success: true,
    message: message,
  };
  if (message.length === 0) {
    response.message = undefined;
  }

  if (data !== null) {
    response.data = data;
  }
  res.status(200).json(response);
};

function pagenation(page, data) {
  const startingIndex = (page - 1) * 10;
  const lastIndex = startingIndex + 10;
  const dataByPage = data.slice(startingIndex, lastIndex);

  return dataByPage;
}

module.exports.successResponse = successResponse;
module.exports.pagenation = pagenation;
