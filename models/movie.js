const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => validator.isURL(image),
      message: (props) => `${props.value} не валидная ссылка!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (trailerLink) => validator.isURL(trailerLink),
      message: (props) => `${props.value} не валидная ссылка!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => validator.isURL(thumbnail),
      message: (props) => `${props.value} не валидная ссылка!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  saved: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
