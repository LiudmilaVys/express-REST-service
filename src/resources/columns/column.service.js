const columnsRepo = require('./column.memory.repository');

const getAll = () => columnsRepo.getAll();

module.exports = { getAll };
