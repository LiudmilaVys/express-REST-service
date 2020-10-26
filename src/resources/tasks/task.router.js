const router = require('express').Router({ mergeParams: true, strict: true });
const { OK, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const boardRouter = require('../boards/board.router');
const Task = require('./task.model');
const tasksService = require('./task.service');
const validateTask = require('./task.validator');
const messages = require('./task.messages');
const { catchError } = require('../../common/util');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boardId = req.params.id;
      const tasks = await tasksService.getAll(boardId);
      res.json(tasks.map(Task.toResponse));
    })
  )
  .post(
    validateTask,
    catchError(async (req, res) => {
      const task = await tasksService.create({
        ...req.body,
        boardId: req.params.id
      });
      res.status(OK).json(Task.toResponse(task));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const taskId = req.params.id;
      const task = await tasksService.getById(taskId);
      res.json(Task.toResponse(task));
    })
  )
  .put(
    validateTask,
    catchError(async (req, res) => {
      const freshTask = await tasksService.update(req.params.id, {
        ...req.body
      });
      res.json(Task.toResponse(freshTask));
    })
  )
  .delete(
    catchError(async (req, res) => {
      const taskId = req.params.id;
      await tasksService.remove(taskId);
      res.end();
    })
  );

router.param('id', async (req, res, next, id) => {
  if (!id) {
    res.status(BAD_REQUEST).send(messages.idRequired);
  }

  const task = await tasksService.getById(id);
  if (!task) {
    res.status(NOT_FOUND).send(messages.notFound);
  } else {
    next();
  }
});

module.exports = router;
