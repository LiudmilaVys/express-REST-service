const usersRepo = require('./user.db.repository');
const User = require('./user.model');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = userData =>
  usersRepo.save(
    new User({
      name: userData.name,
      login: userData.login,
      password: userData.password
    })
  );

const update = async (userId, userData) => {
  await usersRepo.update({ userId, ...userData });
  return usersRepo.getById(userId);
};

const remove = userId => {
  tasksService.removeUser(userId);
  return usersRepo.remove(userId);
};

const alreadyExists = async userName => {
  const user = await usersRepo.findByName(userName);
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
