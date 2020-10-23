const usersDBRepo = require('./user.db.repository');
const User = require('./user.model');
const tasksService = require('../tasks/task.service');

const getAll = () => usersDBRepo.getAll();

const getById = id => usersDBRepo.getById(id);

const create = userData =>
  usersDBRepo.save(
    new User({
      name: userData.name,
      login: userData.login,
      password: userData.password
    })
  );

const update = async (userId, userData) => {
  const user = await usersDBRepo.getById(userId);
  user.name = userData.name;
  user.login = userData.login;
  user.password = userData.password;
  await usersDBRepo.update(user);
  return user;
};

const remove = userId => {
  tasksService.removeUser(userId);
  return usersDBRepo.remove(userId);
};

const alreadyExists = async userName => {
  const user = await usersDBRepo.findByName(userName);
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
