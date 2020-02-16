const { Forum } = require('../../db/models');

const getAllForums = require('./getAllForums');

module.exports = {
  ctx: Forum,
  getAllForums,
};
