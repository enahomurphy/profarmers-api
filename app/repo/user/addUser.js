const { User } = require('../../db/models');

const add = async payload => {
  const userInstance = await new User(payload);
  await userInstance.save();
  return userInstance.toJSON();
};

module.exports = add;
