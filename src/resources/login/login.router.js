const router = require('express').Router();
const { OK } = require('http-status-codes');
const validateCredentials = require('./login.validator');
const { catchError } = require('../../common/util');
const authService = require('../../common/auth.service');
const userService = require('../users/user.service');

router.route('/').post(
  validateCredentials,
  catchError(async (req, res, next) => {
    const login = req.body.login;

    const user = await userService.getByName(login);
    const token = await authService.generateToken({ id: user.id, login });

    res.status(OK).json({ id: user.id, token });
  })
);

module.exports = router;
