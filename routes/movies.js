const router = require('express').Router();

const {
  getMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');
const { joiValidateId, joiValidateMovie } = require('../utils/joi-validators');

router.get('/', getMovies);

router.delete('/:id', joiValidateId(), deleteMovieById);

router.post('/', joiValidateMovie(), createMovie);

module.exports = router;
