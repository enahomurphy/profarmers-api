const { TopicReply } = require('../../db/models');

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

  const { rows, count } = await TopicReply.findAndCountAll(query);
  const replies = rows.map(topic => topic.get({ plain: true }));
  return [replies, count];
};

module.exports = getUserReplies;
