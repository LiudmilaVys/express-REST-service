const uuid = require('uuid');
const db = require('../../db');
const Task = require('./task.model');

const getAll = async () => db.tasks.slice(0, db.tasks.length);

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

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove
};
