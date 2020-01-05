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

module.exports.decode = token => {
  try {
    if (token) {
      return jwt.verify(token, config.secret);
    }
    return null;
  } catch (err) {
    return null;
  }
};
