const { Topic, sequelize } = require('../../db/models');

const getRecent = async (filter = {}, limit = 20, offset = 0, sort = 'LATEST_REPLY') => {
  const query = {
    where: filter,
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
        include: ['user'],
      },
      {
        association: 'user',
        required: true,
      },
    ],
    distinct: true,
  };

  switch (sort) {
  case 'LATEST_REPLY':
    query.order = [
      [sequelize.literal('"lastReply"'), 'DESC'],
    ];
    break;
  case 'LATEST':
    query.order = [
      [sequelize.literal('"created_at"'), 'DESC'],
    ];
    break;
  default:
    query.order = [
      [sequelize.literal('"created_at"'), 'DESC'],
    ];
  }

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
