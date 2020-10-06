const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validator');
const messages = require('./user.messages');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const userData = req.body;
    validateUser(userData, res);

    const user = await usersService.create(userData);
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const userId = req.params.id;
    const user = await usersService.getById(userId);

    if (user) {
      // map user fields to exclude secret fields like "password"
      res.json(User.toResponse(user));
    } else {
      res.status(404).send(messages.notFound);
    }
  })
  .put(async (req, res) => {
    const userId = req.params.id;
    const user = await usersService.getById(userId);

    if (user) {
      const userData = req.body;
      validateUser(userData, res);

      const freshUser = usersService.update(userId, userData);
      res.json(User.toResponse(freshUser));
    } else {
      res.status(404).send(messages.notFound);
    }
  })
  .delete(async (req, res) => {
    const userId = req.params.id;
    const user = await usersService.getById(userId);

    if (user) {
      usersService.remove(userId);
      res.end();
    } else {
      res.status(404).send(messages.notFound);
    }
  });

module.exports = router;
