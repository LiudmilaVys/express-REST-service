const { METHOD_FAILURE, getStatusText } = require('http-status-codes');
const logger = require('./logger');

const catchError = fn => (req, res, next) => {
  try {
    return fn(req, res, next);
  } catch (error) {
    logger.error(error.message);
    res.status(METHOD_FAILURE).send(getStatusText(METHOD_FAILURE));
  }
};

module.exports = { catchError };
