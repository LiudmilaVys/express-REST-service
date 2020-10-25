const router = require('express').Router();
const { OK, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validator');
const messages = require('./user.messages');
const { catchError } = require('../../common/util');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
      res.json(users.map(User.toResponse));
    })
  )
  .post(
    catchError(async (req, res, next) => {
      await validateUser(req, res, next);
    }),
    catchError(async (req, res) => {
      const user = await usersService.create({ ...req.body });
      res.status(OK).json(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const userId = req.params.id;
      const user = await usersService.getById(userId);

      // map user fields to exclude secret fields like "password"
      res.json(User.toResponse(user));
    })
  )
  .put(
    catchError(async (req, res, next) => {
      await validateUser(req, res, next);
      next();
    }),
    catchError(async (req, res) => {
      const freshUser = await usersService.update(req.params.id, {
        ...req.body
      });
      res.json(User.toResponse(freshUser));
    })
  )
  .delete(
    catchError(async (req, res, next) => {
      const userId = req.params.id;
      await usersService.remove(userId);
      res.end();
    })
  );

router.param('id', async (req, res, next, id) => {
  if (!id) {
    res.status(BAD_REQUEST).send(messages.idRequired);
  }

  const user = await usersService.getById(id);
  if (!user) {
    res.status(NOT_FOUND).send(messages.notFound);
  } else {
    next();
  }
});

module.exports = router;
