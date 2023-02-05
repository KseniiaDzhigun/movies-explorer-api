const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      // Используем метод isEmail модуля Validator
      validate: {
        validator: (email) => validator.isEmail(email),
        message: (props) => `${props.value} не валидный email!`,
      },
    },
    password: {
      type: String,
      required: true,
      // По умолчанию хеш пароля пользователя не будет возвращаться из базы
      select: false,
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
  },
  { versionKey: false },
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
