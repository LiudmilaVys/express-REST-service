const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const validateTask = require('./task.validator');
const messages = require('./task.messages');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks.map(Task.toResponse));
  })
  .post(async (req, res) => {
    const taskData = req.body;
    validateTask(taskData, res);

    const task = await tasksService.create(taskData);
    res.json(Task.toResponse(task));
  });

router
  .route('/:boardId/tasks/:id')
  .get(async (req, res) => {
    const taskId = req.params.id;
    const task = await tasksService.getById(taskId);
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

router.param('id', async (req, res, next, id) => {
  if (!id) {
    res.status(404).send(messages.idRequired);
  }

  const task = await tasksService.getById(id);
  if (!task) {
    res.status(404).send(messages.notFound);
  }
  next();
});

module.exports = router;
