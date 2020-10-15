const { BAD_REQUEST } = require('http-status-codes');
const tasksService = require('./task.service');
const messages = require('./task.messages');

module.exports = (task, res) => {
  if (!task.title) {
    res.status(BAD_REQUEST).send(messages.titleRequired);
  }
  if (Number.isNaN(task.order)) {
    res.status(BAD_REQUEST).send(messages.orderRequired);
  }
  if (Number.isNaN(task.boardId)) {
    res.status(BAD_REQUEST).send(messages.boardIdRequired);
  }
};
