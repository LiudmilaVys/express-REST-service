const { BAD_REQUEST } = require('http-status-codes');
const usersService = require('./user.service');
const messages = require('./user.messages');

module.exports = async (req, res, next) => {
  const user = { ...req.body };

  if (!user.name) {
    res.status(BAD_REQUEST).send(messages.nameRequired);
    next('route');
  }

  if (!req.params.id) {
    const userAlreadyExists = await usersService.alreadyExists(user.name);
    if (userAlreadyExists) {
      res.status(BAD_REQUEST).send(messages.duplicated);
      next('route');
    }
  }

  if (!user.login) {
    res.status(BAD_REQUEST).send(messages.loginRequired);
    next('route');
  }

  if (!user.password) {
    res.status(BAD_REQUEST).send(messages.passwordRequired);
    next('route');
  }

  next();
};
