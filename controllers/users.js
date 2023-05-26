const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const User = require('../models/user');

const {
  NOT_FOUND_MESSAGE_USER,
  OK,
  CREATED,
  UNAUTHORIZED_MESSAGE_LOGIN,
  CONFLICT_MESSAGE,
} = require('../utils/constants');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(new NotFoundError(NOT_FOUND_MESSAGE_USER));

    return res.status(OK).json(user);
  } catch (e) {
    return next(e);
  }
};

// on successful registration return cookies
// so that the user can immediately use the website (without a login)
const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    // Pass 3 arguments to the sign method: payload, signature secret key, token validity time
    const token = jwt.sign(
      { _id: user.id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .status(CREATED).json({
        name: user.name,
        email: user.email,
        _id: user.id,
      });
  } catch (e) {
    if (e.code === 11000) {
      return next(new ConflictError(CONFLICT_MESSAGE));
    }
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return next(new BadRequestError(errors.join(', ')));
    }
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true, // then handler will receive the updated record as input
      runValidators: true, // data will be validated before changing
    })
      .orFail(new NotFoundError(NOT_FOUND_MESSAGE_USER));

    return res.status(OK).json(user);
  } catch (e) {
    if (e.code === 11000) {
      return next(new ConflictError(CONFLICT_MESSAGE));
    }
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return next(new BadRequestError(errors.join(', ')));
    }
    return next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const {
      email, password,
    } = req.body;

    const user = await User.findOne({ email }).select('+password')
      .orFail(new UnauthorizedError(UNAUTHORIZED_MESSAGE_LOGIN));

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_LOGIN));
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    // Write JWT in httpOnly Cookies
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .status(OK).json({
        name: user.name,
        email: user.email,
        _id: user.id,
      });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  login,
  getCurrentUser,
  createUser,
  updateUser,
};
