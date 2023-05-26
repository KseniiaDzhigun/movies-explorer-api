const router = require('express').Router();

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { joiValidateProfile } = require('../utils/joi-validators');

router.get('/me', getCurrentUser);

router.patch('/me', joiValidateProfile(), updateUser);

module.exports = router;
