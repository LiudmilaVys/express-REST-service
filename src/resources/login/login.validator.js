const { FORBIDDEN, BAD_REQUEST } = require('http-status-codes');
const userService = require('../users/user.service');
const authService = require('../../common/auth.service');
const messages = require('./login.messages');

const validate = async (req, res, next) => {
  if (!req.body.login) {
    res.status(BAD_REQUEST).send(messages.loginRequired);
  } else if (!req.body.password) {
    res.status(BAD_REQUEST).send(messages.passwordRequired);
  } else {
    const user = await userService.getByName(req.body.login);
    if (user) {
      const passwordIsValid = await authService.checkCredentials(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
        next();
      } else {
        res.sendStatus(FORBIDDEN);
      }
    } else {
      res.sendStatus(FORBIDDEN);
    }
  }
};

module.exports = validate;
