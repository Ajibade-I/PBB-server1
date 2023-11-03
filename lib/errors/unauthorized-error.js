const customAPIError = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statuscode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
