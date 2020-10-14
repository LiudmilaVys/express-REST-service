const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const db = require('./db');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');
const logger = require('./common/logger');

db.init();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  \\throw new Error('Some server error.');
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

// To check this please uncomment line 20
app.use((err, req, res, next) => {
  logger.error(err.message);
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

module.exports = app;
