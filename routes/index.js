const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { joiValidateUser, joiValidateLogin } = require('../utils/joi-validators');

router.post('/signin', joiValidateLogin(), login);

router.post('/signup', joiValidateUser(), createUser);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли из аккаунта' });
});

// Protect all routes except for the registration and login page with authorisation
router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

module.exports = router;
