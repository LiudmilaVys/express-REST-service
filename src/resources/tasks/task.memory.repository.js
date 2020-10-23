const uuid = require('uuid');
const db = require('../../db/inMemoryDB');
const Task = require('./task.model');

const getAll = boardId => db.tasks.filter(task => task.boardId == boardId);

const getById = id => db.tasks.filter(task => task.id == id)[0];

const save = task => db.tasks.push(task);

const update = task => {
  const existingTask = getById(task.id);
  Object.assign(existingTask, task);
};

const remove = id => {
  const existingTask = getById(id);
  for (let i = 0; i < db.tasks.length; i++) {
    if (db.tasks[i].id == existingTask.id) {
      db.tasks.splice(i, 1);
    }
  }
};

const removeByBoardId = boardId => {
  db.tasks = db.tasks.filter(task => task.boardId != boardId);
};

const removeUser = userId => {
  for (let i = 0; i < db.tasks.length; i++) {
    if (db.tasks[i].userId == userId) {
      db.tasks[i].userId = null;
    }
  }
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  removeByBoardId,
  removeUser
};
