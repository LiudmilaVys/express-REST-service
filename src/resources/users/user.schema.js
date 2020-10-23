const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: uuid(),
      required: true
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    login: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true
    }
  },
  { _id: false }
);

module.exports = userSchema;
