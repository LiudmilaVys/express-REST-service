const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();
const getById = async id => usersRepo.getById(id);

module.exports = {
  getAll,
  getById
};
