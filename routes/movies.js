const router = require('express').Router();

const {
  getMovies, deleteMovieById, createMovie,
} = require('../controllers/movies');
const { joiValidateId, joiValidateMovie } = require('../utils/joi-validators');

// Возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// Тела, параметры запросов к серверу должны валидироваться до передачи обработки в контроллеры, Joi

// Создаёт фильм с переданными в теле country, director,
// duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', joiValidateMovie(), createMovie);

// Удаляет сохранённый фильм по id
router.delete('/:id', joiValidateId(), deleteMovieById);

module.exports = router;
