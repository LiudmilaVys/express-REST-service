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

module.exports = {
  getAll,
  getById
};
