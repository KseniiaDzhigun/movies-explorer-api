// Миддлвэр для защиты авторизацией всех маршрутов, кроме страницы регистрации и логина

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  UNAUTHORIZED_MESSAGE_AUTH,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_AUTH));
  }
  let payload;

  try {
    // Убедимся, что пользователь прислал именно тот токен, который был выдан ему ранее.
    // Метод jwt.verify вернёт пейлоуд токена (объект с id), если тот прошёл проверку.
    payload = jwt.verify(
      token,
      // в режиме разработки код запускается и работает и без .env файла.
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_AUTH));
  }

  // записываем пейлоуд в объект запроса
  req.user = payload;

  // пропускаем запрос дальше
  return next();
};
