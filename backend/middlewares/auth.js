const { JWT_SECRET, NODE_ENV } = process.env;

const jwt = require('jsonwebtoken');
const AuthError = require('../utils/customErrors/AuthError');

module.exports = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    throw new AuthError('Не пройдена аутентификация: отсутствует куки или токен');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError('Не пройдена аутентификация: неверный токен');
  }

  req.user = payload;
  next();
};
