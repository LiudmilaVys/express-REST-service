const mongoose = require('mongoose');
const UserSchema = require('./user.schema');
const UserDocument = mongoose.model('User', UserSchema);

const getAll = () => UserDocument.find({}).exec();

const getById = id => UserDocument.findById(id).exec();

const save = user => UserDocument.create(new UserDocument({ ...user }));

const update = user =>
  UserDocument.updateOne(
    { _id: user.id },
    { name: user.name, login: user.login, password: user.password }
  ).exec();

const remove = id => UserDocument.deleteOne({ _id: id }).exec();

const findByName = name => UserDocument.findOne({ name }).exec();

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
  findByName
};
