const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const validateTask = require('./task.validator');
const messages = require('./task.messages');
const boardsService = require('../boards/board.service');
const boardsMessages = require('../boards/board.messages');

router
  .route('/:boardId/tasks')
  .get((req, res) => {
    const boardId = req.params.boardId;
    const tasks = tasksService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  })
  .post((req, res) => {
    const taskData = req.body;
    validateTask(taskData, res);

    const task = tasksService.create(taskData);
    res.json(Task.toResponse(task));
  });

router
  .route('/:boardId/tasks/:id')
  .get((req, res) => {
    const taskId = req.params.id;
    const task = tasksService.getById(taskId);
    res.json(Task.toResponse(task));
  })
  .put((req, res) => {
    const taskId = req.params.id;
    const taskData = req.body;
    validateTask(taskData, res);

    const freshTask = tasksService.update(taskId, taskData);
    res.json(Task.toResponse(freshTask));
  })
  .delete((req, res) => {
    const taskId = req.params.id;
    tasksService.remove(taskId);
    res.end();
  });

router.param('boardId', (req, res, next, boardId) => {
  if (!boardId) {
    res.status(404).send(boardsMessages.idRequired);
  }

  const board = boardsService.getById(boardId);
  if (!board) {
    res.status(404).send(boardsMessages.notFound);
  } else {
    next();
  }
});

router.param('id', (req, res, next, id) => {
  if (!id) {
    res.status(404).send(messages.idRequired);
  }

  const task = tasksService.getById(id);
  if (!task) {
    res.status(404).send(messages.notFound);
  } else {
    next();
  }
});

module.exports = router;
