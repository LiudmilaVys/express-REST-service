const uuid = require('uuid');
const db = require('../../db');
const Board = require('./board.model');

const getAll = async () => db.boards.slice(0, db.boards.length);

const getById = id => db.boards.filter(board => board.id == id)[0];

const save = board => db.boards.push(board);

const update = board => {
  const existingBoard = getById(board.id);
  Object.assign(existingBoard, board);
};

const remove = id => {
  const existingBoard = getById(id);
  for (let i = 0; i < db.boards.length; i++) {
    if (db.boards[i].id == existingBoard.id) {
      db.boards.splice(i, 1);
    }
  }
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove
};
