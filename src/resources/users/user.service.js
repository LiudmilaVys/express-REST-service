const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = userData => {
  const user = new User({
    name: userData.name,
    login: userData.login,
    password: userData.password
  });
  usersRepo.save(user);
  return user;
};

const update = (userId, userData) => {
  const user = usersRepo.getById(userId);
  user.name = userData.name;
  user.login = userData.login;
  user.password = userData.password;
  usersRepo.update(user);
  return user;
};

const remove = userId => {
  usersRepo.remove(userId);
  tasksService.removeUser(userId);
};

const alreadyExists = userName => {
  const user = usersRepo.findByName(userName);
  return !!user;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  alreadyExists
};
