const tasksRepo = require('./task.db.repository');
const Task = require('./task.model');

const getAll = boardId => tasksRepo.getAll(boardId);

const getById = id => tasksRepo.getById(id);

const create = taskData =>
  tasksRepo.save(
    new Task({
      title: taskData.title,
      order: taskData.order,
      description: taskData.description,
      userId: taskData.userId,
      boardId: taskData.boardId,
      columnId: taskData.columnId
    })
  );

const update = async (id, taskData) => {
  const task = await tasksRepo.getById(id);
  task.title = taskData.title;
  task.order = taskData.order;
  task.description = taskData.description;
  task.userId = taskData.userId;
  task.boardId = taskData.boardId;
  task.columnId = taskData.columnId;
  await tasksRepo.update(task);
  return task;
};

const remove = id => tasksRepo.remove(id);

const removeByBoardId = boardId => tasksRepo.removeByBoardId(boardId);

const removeUser = userId => tasksRepo.removeUser(userId);

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  removeByBoardId,
  removeUser
};
