const get = require('lodash/get');

const resolve = async (_, args, { repo }) => {
  const topics = (await repo.Topic.getRecent()).map(topic => {
    const replies = get(topic, 'replies', []);
    if (replies.length) {
      const lastUpdatedAt = replies[0].updatedAt;
      const users = replies.slice(0, 4).reduce((acc, { user }) => {
        if (user) {
          acc.push(user);
        }

        return acc;
      }, []);
      return {
        ...topic,
        lastUpdatedAt,
        users,
      };
    }

    return {
      ...topic,
      lastUpdatedAt: topic.updatedAt,
    };
  });


  return topics;
};

module.exports = resolve;
