const { TopicReply, sequelize } = require('../../db/models');

const getUserReplies = async (filter, { limit = 20, offset = 0 }) => {
  const query = {
    where: {
      ...filter,
    },
    include: [
      'user',
    ],
    order: [
      [sequelize.literal('"created_at"'), 'DESC'],
    ],
  };

  if (offset) {
    query.offset = offset;
  }

  if (limit) {
    query.limit = limit;
  }

  const { rows, count } = await TopicReply.findAndCountAll(query);
  const replies = rows.map(reply => reply.get({ plain: true }));
  return { replies, count };
};

module.exports = getUserReplies;
