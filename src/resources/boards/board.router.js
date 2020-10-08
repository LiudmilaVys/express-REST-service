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

    if (board) {
      res.json(Board.toResponse(board));
    } else {
      res.status(404).send(messages.notFound);
    }
  })
  .put(async (req, res) => {
    const boardId = req.params.id;
    const board = await boardsService.getById(boardId);

    if (board) {
      const boardData = req.body;
      validateBoard(boardData, res);

      const freshBoard = boardsService.update(boardId, boardData);
      res.json(Board.toResponse(freshBoard));
    } else {
      res.status(404).send(messages.notFound);
    }
  })
  .delete(async (req, res) => {
    const boardId = req.params.id;
    const board = await boardsService.getById(boardId);

    if (board) {
      boardsService.remove(boardId);
      res.end();
    } else {
      res.status(404).send(messages.notFound);
    }
  });

module.exports = router;
