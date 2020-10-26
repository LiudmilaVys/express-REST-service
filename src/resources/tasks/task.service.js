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
  await tasksRepo.update({ id, ...taskData });
  return tasksRepo.getById(id);
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
