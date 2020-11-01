const mongoose = require('mongoose');
const config = require('../common/config');
const logger = require('../common/logger');
const userService = require('../resources/users/user.service');

const connect = () => {
  mongoose.connect(config.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const dbConnection = mongoose.connection;
  dbConnection.on('error', error => {
    logger.error('Connection error:', { message: error.message });
  });
  dbConnection.once('open', () => {
    logger.info('Connected sucessfully to DB.');
  });
};

const setupAdmin = async () => {
  const admin = await userService.getByName('admin');
  if (!admin) {
    await userService.create({
      name: 'admin',
      login: 'admin',
      password: 'admin'
    });
  }
};

module.exports = {
  connect,
  setupAdmin
};
