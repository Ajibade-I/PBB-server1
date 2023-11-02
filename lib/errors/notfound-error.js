const customAPIError = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends customAPIError {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
