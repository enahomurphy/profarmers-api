const { User } = require('../../db/models');

const getById = async id => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  return user.toJSON();
};

module.exports = getById;
