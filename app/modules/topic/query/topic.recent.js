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
    let users = [];
    let lastUpdatedAt = topic.updatedAt;

    if (replies.length) {
      lastUpdatedAt = replies[0].updatedAt;
      users = replies.slice(0, 4).reduce((acc, { user }) => {
        if (user) {
          acc.push(user);
        }

        return acc;
      }, []);
    }

    return {
      ...topic,
      users,
      lastUpdatedAt,
    };
  });

  return {
    topics: formartedTopics,
    pageInfo: pageInfo(count, page, pageLimit),
  };
};

module.exports = resolve;
