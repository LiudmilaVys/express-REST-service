const uuid = require('uuid');
const db = require('../../db');
const User = require('./user.model');

const getAll = () => db.users.slice(0, db.users.length);

const getById = id => db.users.filter(user => user.id == id)[0];

const save = user => db.users.push(user);

const update = user => {
  const existingUser = getById(user.id);
  Object.assign(existingUser, user);
};

const remove = id => {
  const existingUser = getById(id);
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id == existingUser.id) {
      db.users.splice(i, 1);
    }
  }
};

const findByName = name => db.users.filter(user => user.name == name)[0];

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  findByName
};
