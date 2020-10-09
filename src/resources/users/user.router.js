const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validateUser = require('./user.validator');
const messages = require('./user.messages');

router
  .route('/')
  .get((req, res) => {
    const users = usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post((req, res) => {
    const userData = req.body;
    validateUser(userData, res);

    const user = usersService.create(userData);
    res.json(User.toResponse(user));
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
    const userId = req.params.id;
    const userData = req.body;
    validateUser(userData, res);

    const freshUser = usersService.update(userId, userData);
    res.json(User.toResponse(freshUser));
  })
  .delete((req, res) => {
    const userId = req.params.id;
    usersService.remove(userId);
    res.end();
  });

router.param('id', (req, res, next, id) => {
  if (!id) {
    res.status(404).send(messages.idRequired);
  }

  const user = usersService.getById(id);
  if (!user) {
    res.status(404).send(messages.notFound);
  } else {
    next();
  }
});

module.exports = router;
