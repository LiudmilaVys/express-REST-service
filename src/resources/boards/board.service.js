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
  await boardsRepo.update({ boardId, ...boardData });
  return boardsRepo.getById(boardId);
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
