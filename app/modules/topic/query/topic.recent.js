const get = require('lodash/get');
const { pageInfo } = require('../../../lib');

const resolve = async (_, { limit, page = 1, forumId }, { repo }) => {
  const pageLimit = limit || 20;
  const offset = pageLimit * (page - 1);
  const filter = {};

  if (forumId) {
    filter.forumId = forumId;
  }

  const { topics, count } = (await repo.Topic.getRecent(filter, pageLimit, offset));

  const formartedTopics = topics.map(topic => {
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

  return {
    topics: formartedTopics,
    pageInfo: pageInfo(count, page, pageLimit),
  };
};

module.exports = resolve;
