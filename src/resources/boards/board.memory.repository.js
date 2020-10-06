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

module.exports = { getAll };
