const router = require('express').Router();

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');
const { joiValidateProfile } = require('../utils/joi-validators');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);

// Обновляет информацию о пользователе (email и имя)
// Тела, параметры запросов к серверу валидируются до передачи обработки в контроллеры - Joi
router.patch('/me', joiValidateProfile(), updateUser);

module.exports = router;
