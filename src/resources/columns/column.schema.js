const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema(
  {
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
    }
  }
);

module.exports = columnSchema;
