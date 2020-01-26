const { Topic } = require('../../db/models');

const getUserReplies = async (filter, { limit = 20, offset = 0 }) => {
  const query = {
    where: {
      ...filter,
    },
  };

  if (offset) {
    query.offset = offset;
  }

  if (limit) {
    query.limit = limit;
  }

  const { rows, count } = await Topic.findAndCountAll(query);
  const topics = rows.map(topic => topic.get({ plain: true }));
  return [topics, count];
};

module.exports = getUserReplies;
