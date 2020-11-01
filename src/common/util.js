const { METHOD_FAILURE } = require('http-status-codes');
const logger = require('./logger');

const catchError = fn => (req, res, next) => {
  try {
    return fn(req, res, next);
  } catch (error) {
    logger.error(error.message);
    res.sendStatus(METHOD_FAILURE);
  }
};

module.exports = { catchError };
