const mongoose = require('mongoose');
const TaskSchema = require('./task.schema');
const TaskDocument = mongoose.model('Task', TaskSchema);

const getAll = boardId => TaskDocument.find({ boardId }).exec();

const getById = id => TaskDocument.findById(id).exec();

const save = task => TaskDocument.create(new TaskDocument({ ...task }));

const update = task => TaskDocument.updateOne({ _id: task.id }, task).exec();

const remove = id => TaskDocument.deleteOne({ _id: id }).exec();

const removeByBoardId = boardId => TaskDocument.deleteOne({ boardId }).exec();

const removeUser = userId =>
  TaskDocument.update({ userId }, { userId: null }).exec();

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  removeByBoardId,
  removeUser
};
