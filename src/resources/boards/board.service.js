const boardsRepo = require('./board.db.repository');
const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = boardData =>
  boardsRepo.save(
    new Board({
      title: boardData.title,
      columns: boardData.columns
    })
  );

const update = async (boardId, boardData) => {
  const board = boardsRepo.getById(boardId);
  board.title = boardData.title;
  board.columns = boardData.columns;
  await boardsRepo.update(board);
  return board;
};

const remove = async boardId => {
  boardsRepo.remove(boardId);
  await tasksService.removeByBoardId(boardId);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
