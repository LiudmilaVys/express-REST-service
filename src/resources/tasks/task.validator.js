const tasksService = require('./task.service');
const messages = require('./task.messages');

module.exports = (task, res) => {
  if (!task.title) {
    res.status(400).send(messages.titleRequired);
  }
  if (Number.isNaN(task.order)) {
    res.status(400).send(messages.orderRequired);
  }
  if (Number.isNaN(task.boardId)) {
    res.status(400).send(messages.boardIdRequired);
  }
};
