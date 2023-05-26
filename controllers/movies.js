const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Movie = require('../models/movie');
const User = require('../models/user');
const {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE_MOVIE,
  OK,
  OK_MESSAGE,
  CREATED,
  FORBIDDEN_MESSAGE,
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    // only retrieve those cards belonging to the user
    const movies = await Movie.find({ owner: req.user._id }).populate('owner');
    return res.status(OK).json(movies);
  } catch (e) {
    return next(e);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id)
      .orFail(new NotFoundError(NOT_FOUND_MESSAGE_MOVIE));

    // User should not be able to delete other users' films
    if (req.user._id !== String(movie.owner._id)) {
      return next(new ForbiddenError(FORBIDDEN_MESSAGE));
    }

    await movie.remove(id);

    return res.status(OK).json({ message: OK_MESSAGE });
  } catch (e) {
    if (e.name === 'CastError') {
      return next(new BadRequestError(BAD_REQUEST_MESSAGE));
    }
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movieOwner = await User.findById(req.user._id);
    const movie = await Movie.create({ owner: movieOwner, saved: req.user._id, ...req.body });
    return res.status(CREATED).json(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return next(new BadRequestError(errors.join(', ')));
    }
    return next(e);
  }
};

module.exports = {
  getMovies,
  deleteMovieById,
  createMovie,
};
