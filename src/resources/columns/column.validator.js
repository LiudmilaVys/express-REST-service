const messages = require('./column.messages');

module.exports = (column, res) => {
  if (!column.title) {
    res.status(400).send(messages.titleRequired);
  }
  if (Number.isNaN(column.order)) {
    res.status(400).send(messages.orderRequired);
  }
};
