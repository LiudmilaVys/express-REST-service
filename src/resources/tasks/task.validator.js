const { BAD_REQUEST } = require('http-status-codes');
const tasksService = require('./task.service');
const messages = require('./task.messages');

module.exports = (req, res, next) => {
  const task = { ...req.body, boardId: req.params.boardId };

  if (!task.title) {
    res.status(BAD_REQUEST).send(messages.titleRequired);
  } else if (Number.isNaN(Number.parseInt(task.order))) {
    res.status(BAD_REQUEST).send(messages.orderRequired);
  } else next();
};
