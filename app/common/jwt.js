const jwt = require('jsonwebtoken');

const config = require('../../config');

module.exports.generateToken = paylaod => {
  const options = {
    algorithm: 'HS256',
    issuer: 'profarmers.ng',
    audience: 'profarmers.ng',
    expiresIn: '365 days',
  };

  return jwt.sign(paylaod, config.secret, options);
};
