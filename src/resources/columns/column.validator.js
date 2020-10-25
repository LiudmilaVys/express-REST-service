const { BAD_REQUEST } = require('http-status-codes');
const messages = require('./column.messages');

module.exports = (column, res, next) => {
  if (!column.title) {
    res.status(BAD_REQUEST).send(messages.titleRequired);
    next('route');
  }
  if (Number.isNaN(column.order)) {
    res.status(BAD_REQUEST).send(messages.orderRequired);
    next('route');
  }
  next();
};
