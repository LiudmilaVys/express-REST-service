const mongoose = require('mongoose');
const logger = require('../common/logger');

const connect = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
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

module.exports = { connect };
