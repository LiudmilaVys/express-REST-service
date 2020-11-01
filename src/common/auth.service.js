const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const encryptPassword = (plainPassword, saltRounds = config.SALT_ROUNDS) =>
  bcrypt.hash(plainPassword, saltRounds);

const checkCredentials = (plainPassword, hash) =>
  bcrypt.compare(plainPassword, hash);

const generateToken = payload =>
  jwt.sign(payload, config.JWT_SECRET_KEY, { expiresIn: '1h' });

const checkToken = token => jwt.verify(token, config.JWT_SECRET_KEY, err => err);

module.exports = {
  encryptPassword,
  checkCredentials,
  generateToken,
  checkToken
};
