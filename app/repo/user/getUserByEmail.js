const { User } = require('../../db/models');

const getByEmail = async (email, include = []) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return user;
  }

  return user.toJSON(include);
};

module.exports = getByEmail;
