// Конструктор наследует от стандартной ошибки и выставляет свойство statusCode

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
