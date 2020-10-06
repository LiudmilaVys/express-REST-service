const uuid = require('uuid');
const User = require('./user.model');

const users = [];
for (let i = 0; i < 10; i++) {
  const user = new User({
    id: uuid(),
    name: `USER${i}`,
    login: `user${i}`,
    password: `P@55w0rd${i}`
  });
  users.push(user);
}

const getAll = () => users.slice(0, users.length);

const getById = id => {
  return users.filter(user => user.id == id)[0];
};

const save = user => users.push(user);

const update = user => {
  const existingUser = getById(user.id);
  Object.assign(existingUser, user);
};

const remove = id => {
  const existingUser = getById(id);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == existingUser.id) {
      users.splice(i, 1);
    }
  }
};

const findByName = name => {
  return users.filter(user => user.name == name)[0];
};

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  findByName
};
