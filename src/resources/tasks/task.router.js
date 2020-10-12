const router = require('express').Router({ mergeParams: true });
const boardRouter = require('../boards/board.router');
const Task = require('./task.model');
const tasksService = require('./task.service');
const validateTask = require('./task.validator');
const messages = require('./task.messages');

boardRouter.use('/:boardId/tasks', router);

router
  .route('/')
  .get((req, res) => {
    const boardId = req.params.boardId;
    const tasks = tasksService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  })
  .post((req, res) => {
    const boardId = req.params.boardId;
    const taskData = req.body;
    taskData.boardId = boardId;
    validateTask(taskData, res);

    const task = tasksService.create(taskData);
    res.json(Task.toResponse(task));
  });

router
  .route('/:id')
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
