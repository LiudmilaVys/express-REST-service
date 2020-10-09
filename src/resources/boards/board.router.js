const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const validateBoard = require('./board.validator');
const messages = require('./board.messages');

router
  .route('/')
  .get((req, res) => {
    const boards = boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
  .post((req, res) => {
    const boardData = req.body;
    validateBoard(boardData, res);

    const board = boardsService.create(boardData);
    res.json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get((req, res) => {
    const boardId = req.params.id;
    const board = boardsService.getById(boardId);
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

router.param('id', (req, res, next, id) => {
  if (!id) {
    res.status(404).send(messages.idRequired);
  }

  const board = boardsService.getById(id);
  if (!board) {
    res.status(404).send(messages.notFound);
  } else {
    next();
  }
});

module.exports = router;
