const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.String,
    default: uuid,
    required: true
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  order: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  description: mongoose.Schema.Types.String,
  userId: mongoose.Schema.Types.String,
  boardId: mongoose.Schema.Types.String,
  columnId: mongoose.Schema.Types.String
});

module.exports = taskSchema;
