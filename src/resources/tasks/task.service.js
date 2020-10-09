const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = boardId => tasksRepo.getAll(boardId);

const create = async taskData => {
  const task = new Task({
    title: taskData.title,
    order: taskData.order,
    description: taskData.description,
    userId: taskData.userId,
    boardId: taskData.boardId,
    columnId: taskData.columnId
  });
  tasksRepo.save(task);
  return task;
};

const getById = async id => tasksRepo.getById(id);

const update = (id, taskData) => {
  const task = tasksRepo.getById(id);
  task.title = taskData.title;
  task.order = taskData.order;
  task.description = taskData.description;
  task.userId = taskData.userId;
  task.boardId = taskData.boardId;
  task.columnId = taskData.columnId;
  tasksRepo.update(task);
  return task;
};

const remove = id =>{
  tasksRepo.remove(id);
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove
};
