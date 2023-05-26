// Protection against multiple automatic requests - brute force, DDoS

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // a maximum of 100 requests can be made from one IP
});

module.exports = limiter;
