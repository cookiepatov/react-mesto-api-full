const jwt = require('jsonwebtoken');
const AuthError = require('../utils/customErrors/AuthError');

module.exports = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    throw new AuthError('Не пройдена аутентификация');
  }

  const token = req.cookies.jwt;

  /* const { authorization } = req.headers;
   if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('authentification needed');
  }

  const token = authorization.replace('Bearer ', ''); */
  let payload;

  try {
    payload = jwt.verify(token, 'temporary-key');
  } catch (err) {
    throw new AuthError('Не пройдена аутентификация');
  }

  req.user = payload;
  next();
};
