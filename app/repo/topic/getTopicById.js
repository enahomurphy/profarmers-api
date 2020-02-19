const { Topic } = require('../../db/models');

const getById = async id => {
  const topic = await Topic.findOne({
    where: { id },
    include: [
      'user',
      'forum',
    ],
  });

  if (!topic) {
    return null;
  }

  return topic.get({ plain: true });
};

module.exports = getById;
