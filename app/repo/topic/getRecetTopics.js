const { Topic, sequelize } = require('../../db/models');

const getRecent = async (limit = 20, offset = 0) => {
  const query = {
    attributes: [
      'id',
      'creatorId',
      'forumId',
      'title',
      'createdAt',
      'updatedAt',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM topic_replies WHERE topic_replies.topic_id = "Topic"."id")',
        ),
        'replyCount',
      ],
      [
        sequelize.literal(
          `(
            SELECT
              updated_at
            FROM
              topic_replies
            WHERE
              topic_replies.topic_id = "Topic"."id"
            ORDER BY
              id DESC
            LIMIT
              1
          )`,
        ),
        'lastReply',
      ],
    ],
    include: [
      {
        association: 'replies',
        required: true,
        include: ['user'],
      },
      {
        association: 'user',
        required: true,
      },
    ],
    order: [
      [sequelize.literal('"lastReply"'), 'DESC'],
    ],
    distinct: true,
  };

  if (offset) {
    query.offset = offset;
  }

  if (limit) {
    query.limit = limit;
  }

  const { rows, count } = await Topic.findAndCountAll(query);
  const topics = rows.map(topic => topic.get({ plain: true }));
  return { topics, count };
};

module.exports = getRecent;
