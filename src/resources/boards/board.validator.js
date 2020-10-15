const { BAD_REQUEST } = require('http-status-codes');
const validateColumn = require('../columns/column.validator');
const messages = require('./board.messages');
const boardsService = require('./board.service');

module.exports = (board, res) => {
  if (!board.title) {
    res.status(BAD_REQUEST).send(messages.titleRequired);
  }

  if (board.columns && Array.isArray(board.columns)) {
    board.columns.forEach(column => {
      validateColumn(column);
    });
  }
};
