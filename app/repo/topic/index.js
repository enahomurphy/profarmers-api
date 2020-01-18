const { Topic } = require('../../db/models');

const getTrending = require('./getTrendingTopic');

module.exports = {
  ctx: Topic,
  getTrending,
};
