const { Topic, sequelize } = require('../../db/models');

const getTrending = async (associations = []) => {
  const query = {
    attributes: [
      'id',
      'creatorId',
      'forumId',
      'title',
      'body',
      [
        sequelize.literal(`
          (
            SELECT
              COUNT(*)
            FROM
              topic_replies
            WHERE
            topic_replies.topic_id = "Topic"."id"
          )
        `),
        'replyCount',
      ],
    ],
    include: [],
    order: [
      [sequelize.literal('"replyCount"'), 'DESC'],
    ],
    limit: 20,
  };

  associations.forEach(association => {
    query.include.push({ association });
  });

  const topics = await Topic.findAll(query);

  const raw = topics.map(topic => topic.get({ plain: true }));
  return raw;
};

module.exports = getTrending;
