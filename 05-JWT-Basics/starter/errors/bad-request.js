const CustomAPIError = require("./custom-error.js");
class BadRequestError extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = BadRequestError;
