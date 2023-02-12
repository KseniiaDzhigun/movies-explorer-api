// Конструктор наследует от стандартной ошибки и выставляет свойство statusCode

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
