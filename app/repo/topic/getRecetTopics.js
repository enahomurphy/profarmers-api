const { Topic, sequelize } = require('../../db/models');

const getRecent = async () => {
  const query = {
    attributes: [
      'id',
      'creatorId',
      'forumId',
      'title',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM topic_replies WHERE topic_replies.topic_id = "Topic"."id")',
        ),
        'replyCount',
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
      },
    ],
    order: [
      [Topic.associations.replies, 'updated_at', 'DESC'],
    ],
  };

  const topics = await Topic.findAll(query);

  const raw = topics.map(topic => topic.get({ plain: true }));
  return raw;
};

module.exports = getRecent;
