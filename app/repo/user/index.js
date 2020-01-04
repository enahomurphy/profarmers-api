const { User } = require('../../db/models');

const add = require('./addUser');
const updateById = require('./updateById');
const getById = require('./getUserById');
const getByEmail = require('./getUserByEmail');

module.exports = {
  ctx: User,
  add,
  updateById,
  getById,
  getByEmail,
};
