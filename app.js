const express = require('express');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { PORT, DB_URL } = process.env;
const router = require('./routes');
const { NOT_FOUND_MESSAGE_PATH } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const err = require('./middlewares/err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rate-limiter');

const app = express();

// Устанавливаем различные HTTP headers, связанные с безопасностью
app.use(helmet());

// Объект req будет обогащаться cookies
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'https://dzhigun.movies.nomoredomainsclub.ru'], credentials: true, maxAge: 60 }));

// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// Логгер запросов
app.use(requestLogger);

// Мидлвэр для защиты от множества автоматических запросов
app.use(limiter);

// Обработчики роутов
app.use('/', router);
app.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_MESSAGE_PATH)));

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(err);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
  });
});
