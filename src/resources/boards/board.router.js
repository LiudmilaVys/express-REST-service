const router = require('express').Router({ strict: true });
const { OK, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');
const validateBoard = require('./board.validator');
const messages = require('./board.messages');
const { catchError } = require('../../common/util');
const taskRouter = require('../tasks/task.router');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards.map(Board.toResponse));
    })
  )
  .post(
    validateBoard,
    catchError(async (req, res) => {
      const board = await boardsService.create({ ...req.body });
      res.status(OK).json(Board.toResponse(board));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const boardId = req.params.id;
      const board = await boardsService.getById(boardId);
      res.json(Board.toResponse(board));
    })
  )
  .put(
    validateBoard,
    catchError(async (req, res) => {
      const freshBoard = await boardsService.update(req.params.id, {
        ...req.body
      });
      res.json(Board.toResponse(freshBoard));
    })
  )
  .delete(
    catchError(async (req, res) => {
      const boardId = req.params.id;
      await boardsService.remove(boardId);
      res.end();
    })
  );

router.param('id', async (req, res, next, id) => {
  if (!id) {
    res.status(BAD_REQUEST).send(messages.idRequired);
  }

  const board = await boardsService.getById(id);
  if (!board) {
    res.status(NOT_FOUND).send(messages.notFound);
  } else {
    next();
  }
});

router.use('/:id/tasks', taskRouter);

module.exports = router;
