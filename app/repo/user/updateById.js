
const { User } = require('../../db/models');

const updateById = async (id, payload) => {
  const [, [user]] = await User.update(
    payload,
    {
      where: { id },
      returning: true,
    },
  );

  return user.toJSON();
};

module.exports = updateById;
