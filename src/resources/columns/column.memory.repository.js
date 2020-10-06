const uuid = require('uuid');
const Column = require('./column.model');

const getAll = async () => {
  const columns = [];
  for(let i=0; i<2;i++){
    const user = new Column({ uuid(), `column${i}`, i });
    columns.push(user);
  }
  return users;
};

module.exports = { getAll };
