const usersRepo = require('./user.db.repository');
const User = require('./user.model');
const tasksService = require('../tasks/task.service');
const authService = require('../../common/auth.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = async userData => {
  const passHash = await authService.encryptPassword(userData.password);
  return usersRepo.save(
    new User({
      name: userData.name,
      login: userData.login,
      password: passHash
    })
  );
};

const update = async (userId, userData) => {
  await usersRepo.update({ userId, ...userData });
  return usersRepo.getById(userId);
};

const remove = userId => {
  tasksService.removeUser(userId);
  return usersRepo.remove(userId);
};

const getByName = userName => usersRepo.findByName(userName);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
};
