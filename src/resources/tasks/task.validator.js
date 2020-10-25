const { BAD_REQUEST } = require('http-status-codes');
const tasksService = require('./task.service');
const messages = require('./task.messages');

module.exports = (req, res, next) => {
  const task = { ...req.body, boardId: req.params.boardId };

  if (!task.title) {
    res.status(BAD_REQUEST).send(messages.titleRequired);
    next('route');
  }
  if (Number.isNaN(task.order)) {
    res.status(BAD_REQUEST).send(messages.orderRequired);
    next('route');
  }
  if (Number.isNaN(task.boardId)) {
    res.status(BAD_REQUEST).send(messages.boardIdRequired);
    next('route');
  }

  next();
};
