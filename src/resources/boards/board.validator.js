const { BAD_REQUEST } = require('http-status-codes');
const validateColumn = require('../columns/column.validator');
const messages = require('./board.messages');
const boardsService = require('./board.service');

module.exports = (req, res, next) => {
  const board = { ...req.body };

  if (!board.title) {
    res.status(BAD_REQUEST).send(messages.titleRequired);
    next('route');
  }

  if (board.columns && Array.isArray(board.columns)) {
    board.columns.forEach(column => {
      validateColumn(column, res, next);
    });
  }

  next();
};
