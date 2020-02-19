const { Topic } = require('../../db/models');

const getTrending = require('./getTrendingTopic');
const getRecent = require('./getRecetTopics');
const getReplies = require('./getReplies');
const getAll = require('./getTopics');
const getById = require('./getTopicById');

module.exports = {
  ctx: Topic,
  getTrending,
  getRecent,
  getReplies,
  getAll,
  getById,
};
