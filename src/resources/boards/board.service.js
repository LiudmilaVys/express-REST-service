const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const getById = async id => boardsRepo.getById(id);

const create = async boardData => {
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

const remove = boardId =>{
  boardsRepo.remove(boardId);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
