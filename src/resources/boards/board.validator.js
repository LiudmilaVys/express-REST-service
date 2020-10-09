const validateColumn = require('../columns/column.validator');
const messages = require('./board.messages');
const boardsService = require('./board.service');

module.exports = (board, res) => {
  if (!board.title) {
    res.status(400).send(messages.titleRequired);
  }

  if (board.columns && Array.isArray(board.columns)) {
    board.columns.forEach(column => {
      validateColumn(column);
    });
  }
};
