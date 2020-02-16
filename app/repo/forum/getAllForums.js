const { Forum, sequelize } = require('../../db/models');

const getAllForums = async (filter = {}, limit = 20, offset = 0) => {
  const query = {
    ...filter,
    attributes: [
      'id',
      'title',
      'description',
      [
        sequelize.literal(
          `(
            SELECT
              COUNT(*)
            FROM
              topics
            WHERE
              topics.forum_id = "Forum"."id"
          )`,
        ),
        'topicCount',
      ],
    ],
    include: [
      {
        association: 'topics',
        required: true,
        include: ['user'],
      },
    ],
    distinct: true,
  };

  if (offset) {
    query.offset = offset;
  }

  if (limit) {
    query.limit = limit;
  }

  const { rows, count } = await Forum.findAndCountAll(query);
  const forums = rows.map(forum => forum.get({ plain: true }));
  return { forums, count };
};

module.exports = getAllForums;
