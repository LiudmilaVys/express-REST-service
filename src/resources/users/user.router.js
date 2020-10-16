const router = require('express').Router();
const { OK, BAD_REQUEST, NOT_FOUND } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validator');
const messages = require('./user.messages');
const { catchError } = require('../../common/util');

router
  .route('/')
  .get((req, res) => {
    const users = usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post((req, res) => {
    const userData = { ...req.body };
    validateUser(userData, res);

    const user = usersService.create(userData);
    res.status(OK).json(User.toResponse(user));
  });

router
  .route('/:id')
  .get((req, res) => {
    const userId = req.params.id;
    const user = usersService.getById(userId);

    // map user fields to exclude secret fields like "password"
    res.json(User.toResponse(user));
  })
  .put((req, res) => {
    const userData = { ...req.body };
    validateUser(userData, res);

    const freshUser = usersService.update(req.params.id, userData);
    res.json(User.toResponse(freshUser));
  })
  .delete(
    catchError((req, res, next) => {
      const userId = req.params.id;
      usersService.remove(userId);
      res.end();
    })
  );

router.param('id', (req, res, next, id) => {
  if (!id) {
    res.status(BAD_REQUEST).send(messages.idRequired);
  }

  const user = usersService.getById(id);
  if (!user) {
    res.status(NOT_FOUND).send(messages.notFound);
  } else {
    next();
  }
});

module.exports = router;
