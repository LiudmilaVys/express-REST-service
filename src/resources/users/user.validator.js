const usersService = require('./user.service');
const messages = require('./user.messages');

module.exports = (user, res) => {
  if (!user.name) {
    res.status(400).send(messages.nameRequired);
  }
  if (usersService.alreadyExists(user.name)) {
    res.status(400).send(messages.duplicated);
  }

  if (!user.login) {
    res.status(400).send(messages.loginRequired);
  }

  if (!user.password) {
    res.status(400).send(messages.passwordRequired);
  }
};
