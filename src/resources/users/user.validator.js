const { BAD_REQUEST } = require('http-status-codes');
const userService = require('./user.service');
const messages = require('./user.messages');

module.exports = async (req, res, next) => {
  const user = { ...req.body };

  if (!user.name) {
    res.status(BAD_REQUEST).send(messages.nameRequired);
  } else if (!user.login) {
    res.status(BAD_REQUEST).send(messages.loginRequired);
  } else if (!user.password) {
    res.status(BAD_REQUEST).send(messages.passwordRequired);
  } else if (!req.params.id) {
    const existingUser = await userService.getByName(user.name);
    if (existingUser) {
      res.status(BAD_REQUEST).send(messages.duplicated);
    } else next();
  } else next();
};
