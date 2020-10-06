const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const userId = req.params.id;
  const user = await usersService.getById(userId);

  if (user) {
    // map user fields to exclude secret fields like "password"
    res.json(User.toResponse(user));
  } else {
    res.status(404).send('User not found.');
  }
});

module.exports = router;
