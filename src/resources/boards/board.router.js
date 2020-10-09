const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const validateBoard = require('./board.validator');
const messages = require('./board.messages');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
  .post(async (req, res) => {
    const boardData = req.body;
    validateBoard(boardData, res);

    const board = await boardsService.create(boardData);
    res.json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const boardId = req.params.id;
    const board = await boardsService.getById(boardId);
    res.json(Board.toResponse(board));
  })
  .put((req, res) => {
    const boardId = req.params.id;
    const boardData = req.body;
    validateBoard(boardData, res);

    const freshBoard = boardsService.update(boardId, boardData);
    res.json(Board.toResponse(freshBoard));
  })
  .delete((req, res) => {
    const boardId = req.params.id;
    boardsService.remove(boardId);
    res.end();
  });

router.param('id', async (req, res, next, id) => {
  if (!id) {
    res.status(404).send(messages.idRequired);
  }

  const board = await boardsService.getById(id);
  if (!board) {
    res.status(404).send(messages.notFound);
  }
  next();
});

module.exports = router;
