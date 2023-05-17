const bcrypt = require('bcrypt');

const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};


module.exports = {
  jwtSecret: generateJwtSecret(),
  jwtExpiration: '1d', // Token expiration time
};
