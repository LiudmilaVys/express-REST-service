const uuid = require('uuid');
const Task = require('./task.model');

const getAll = async () => {
  const tasks = [];
  for (let i = 0; i < 15; i++) {
    const task = new Task({
      id: uuid(),
      title: `task${i}`,
      order: i,
      description: `about task${i}`,
      userId: uuid(),
      boardId: uuid(),
      columnId: uuid()
    });
    tasks.push(task);
  }
  return tasks;
};

module.exports = { getAll };
