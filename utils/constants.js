const BAD_REQUEST_MESSAGE = 'Invalid id sent';
const NOT_FOUND_MESSAGE_USER = 'User not found';
const NOT_FOUND_MESSAGE_MOVIE = 'Movie not found';
const NOT_FOUND_MESSAGE_PATH = 'Path not found';
const INTERNAL_SERVER_ERROR = 500;
const INTERNAL_SERVER_ERROR_MESSAGE = 'Error has occurred';
const OK = 200;
const OK_MESSAGE = 'Movie has been removed';
const CREATED = 201;
const UNAUTHORIZED_MESSAGE_LOGIN = 'Incorrect e-mail or password';
const UNAUTHORIZED_MESSAGE_AUTH = 'Authorization required';
const FORBIDDEN_MESSAGE = 'You cannot delete other users movies';
const CONFLICT_MESSAGE = 'User with this e-mail already exists';

const REGEX_URL = /^https?:\/\/(www.)?[\w-.~:/?#[\]@!$&'()*+,;=]+\.[a-zA-z]+(\/[\w-.~:/?#[\]@!$&'()*+,;=]+)*#?$/;

module.exports = {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE_USER,
  NOT_FOUND_MESSAGE_MOVIE,
  NOT_FOUND_MESSAGE_PATH,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK,
  OK_MESSAGE,
  CREATED,
  UNAUTHORIZED_MESSAGE_LOGIN,
  UNAUTHORIZED_MESSAGE_AUTH,
  FORBIDDEN_MESSAGE,
  CONFLICT_MESSAGE,
  REGEX_URL,
};
