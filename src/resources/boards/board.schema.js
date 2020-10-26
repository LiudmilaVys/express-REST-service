const mongoose = require('mongoose');
const uuid = require('uuid');
const columnSchema = require('../columns/column.schema');

const boardSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.String,
    default: uuid,
    required: true
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  columns: {
    type: [columnSchema],
    default: []
  }
});

module.exports = boardSchema;
