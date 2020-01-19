const { Topic } = require('../../db/models');

const getTrending = require('./getTrendingTopic');
const getRecent = require('./getRecetTopics');

module.exports = {
  ctx: Topic,
  getTrending,
  getRecent,
};
