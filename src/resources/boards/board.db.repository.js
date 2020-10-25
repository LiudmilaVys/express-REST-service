const mongoose = require('mongoose');
const BoardSchema = require('./board.schema');
const BoardDocument = mongoose.model('Board', BoardSchema);

const getAll = () => BoardDocument.find({}).exec();

const getById = id => BoardDocument.findById(id).exec();

const save = board => BoardDocument.create(new BoardDocument({ ...board }));

const update = board =>
  BoardDocument.updateOne({ _id: board.id }, board).exec();

const remove = id => BoardDocument.deleteOne({ _id: id }).exec();

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove
};
