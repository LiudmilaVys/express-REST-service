const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {
  INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED,
  getStatusText
} = require('http-status-codes');
const db = require('./db');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');
const logger = require('./common/logger');

// To check this please uncomment line 20
process.on('uncaughtException', error => {
  logger.error('Process error:', { message: error.message });
});
//throw Error('Oops!');

// To check this please uncomment line 26
process.on('unhandledRejection', message => {
  logger.error('Unhandled rejection:', { message });
});
//Promise.reject('Async operation has failed.');

db.init();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use((req, res, next) => {
  //throw new Error('Some service error.');
  const { method, url, query, body } = req;
  logger.info(
    `method: ${method}, URL: ${url}, query: ${JSON.stringify(
      query
    )}, body: ${JSON.stringify(body)}`,
    method,
    url,
    query,
    body
  );
  next();
});
// To check this please uncomment line 35
app.use((err, req, res, next) => {
  logger.error('App error:', { message: err.message });
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use('/users', userRouter);
app.use('*', (req, res) =>
  res.status(NOT_IMPLEMENTED).send(getStatusText(NOT_IMPLEMENTED))
);

module.exports = app;
