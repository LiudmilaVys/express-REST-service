const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {
  INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED,
  UNAUTHORIZED
} = require('http-status-codes');
const mongoDB = require('./db/mongoDB');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');
const loginRouter = require('./resources/login/login.router');
const authService = require('./common/auth.service');
const logger = require('./common/logger');
const config = require('./common/config');

process
  .on('uncaughtException', error => {
    logger.error('Process error:', { message: error.message });
  })
  .on('unhandledRejection', message => {
    logger.error('Unhandled rejection:', { message });
  });

mongoDB.connect();
const initApp = () =>
  mongoDB.setupAdmin().then(() => {
    const app = express();
    const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

    app.use(express.json());
    app.use((req, res, next) => {
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

    // not '/', '/doc' and '/login'
    app.use(/^(?!(?:\/doc|\/login|\/$)).*$/, async (req, res, next) => {
      const token = req.headers['authorization'];

      if (token) {
        const err = await authService.checkToken(token.replace('Bearer ', ''));
        if (err) {
          res.sendStatus(UNAUTHORIZED);
        } else next();
      } else res.sendStatus(UNAUTHORIZED);
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
    app.use('/users', userRouter);
    app.use('/login', loginRouter);
    app.use('*', (req, res) => res.sendStatus(NOT_IMPLEMENTED));

    app.use((err, req, res, next) => {
      logger.error('App error:', { message: err.message });
      res.sendStatus(INTERNAL_SERVER_ERROR);
    });

    return app;
  });

module.exports = { initApp };
