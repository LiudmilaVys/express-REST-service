const { BAD_REQUEST } = require('http-status-codes');
const usersService = require('./user.service');
const messages = require('./user.messages');

module.exports = (user, res) => {
  if (!user.name) {
    res.status(BAD_REQUEST).send(messages.nameRequired);
  }
  if (usersService.alreadyExists(user.name)) {
    res.status(BAD_REQUEST).send(messages.duplicated);
  }

  if (!user.login) {
    res.status(BAD_REQUEST).send(messages.loginRequired);
  }

  if (!user.password) {
    res.status(BAD_REQUEST).send(messages.passwordRequired);
  }
};
