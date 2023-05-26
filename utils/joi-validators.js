const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('./constants');

// Id must be validated as a hex sequence of 24 characters (0-9, A-F)
const joiId = () => Joi.string().length(24).hex().required();

const joiLink = () => Joi.string().required().pattern(REGEX_URL);

const joiLimitedText = () => Joi.string().required().min(2).max(30);
const joiText = () => Joi.string().required();

const joiNumber = () => Joi.number().required();

const joiEmail = () => Joi.string().required().email();

const joiValidateLogin = () => celebrate({
  body: Joi.object().keys({
    email: joiEmail(),
    password: joiText(),
  }),
});

const joiValidateUser = () => celebrate({
  body: Joi.object().keys({
    name: joiLimitedText(),
    email: joiEmail(),
    password: joiText(),
  }),
});

const joiValidateProfile = () => celebrate({
  body: Joi.object().keys({
    name: joiLimitedText(),
    email: joiEmail(),
  }),
});

const joiValidateId = () => celebrate({
  params: Joi.object().keys({
    id: joiId(),
  }),
});

const joiValidateMovie = () => celebrate({
  body: Joi.object().keys({
    country: joiText(),
    director: joiText(),
    duration: joiNumber(),
    year: joiText(),
    description: joiText(),
    image: joiLink(),
    trailerLink: joiLink(),
    thumbnail: joiLink(),
    movieId: joiNumber(),
    nameRU: joiText(),
    nameEN: joiText(),
  }),
});

module.exports = {
  joiValidateProfile,
  joiValidateMovie,
  joiValidateLogin,
  joiValidateUser,
  joiValidateId,
};
