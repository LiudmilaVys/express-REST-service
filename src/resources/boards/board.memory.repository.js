const uuid = require('uuid');
const Board = require('./board.model');

const boards = [];
for (let i = 0; i < 3; i++) {
  const board = new Board({ id: uuid(), title: `board${i}` });
  boards.push(board);
}

const getAll = async () => {
  return boards.slice(0, boards.length);
};

const getById = id => {
  return boards.filter(board => board.id == id)[0];
};

const save = board => boards.push(board);

const update = board => {
  const existingBoard = getById(board.id);
  Object.assign(existingBoard, board);
};

const remove = id => {
  const existingBoard = getById(id);
  for (let i = 0; i < boards.length; i++) {
    if (boards[i].id == existingBoard.id) {
      boards.splice(i, 1);
    }
  }
};

const findByTitle = title => {
  return boards.filter(board => board.title == title)[0];
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  findByTitle
};
