const { Forum } = require('../../db/models');

const getAllForums = require('./getAllForums');
const getById = require('./getForumById');

module.exports = {
  ctx: Forum,
  getAllForums,
  getById,
};
