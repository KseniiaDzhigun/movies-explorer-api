// Конструктор наследует от стандартной ошибки и выставляет свойство statusCode

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
