const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = boardData => {
  const board = new Board({
    title: boardData.title,
    columns: boardData.columns
  });
  boardsRepo.save(board);
  return board;
};

const update = (boardId, boardData) => {
  const board = boardsRepo.getById(boardId);
  board.title = boardData.title;
  board.columns = boardData.columns;
  boardsRepo.update(board);
  return board;
};

const remove = boardId => {
  boardsRepo.remove(boardId);
  tasksService.removeByBoardId(boardId);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
