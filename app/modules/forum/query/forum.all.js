const get = require('lodash/get');
const { pageInfo } = require('../../../lib');

const resolve = async (_, { limit, page = 1 }, { repo }) => {
  const pageLimit = limit || 20;
  const offset = pageLimit * (page - 1);
  const { forums, count } = (await repo.Forum.getAllForums({}, pageLimit, offset));

  const forumResult = forums.map(forum => {
    const topics = get(forum, 'topics', []);
    let users = [];

    if (topics.length) {
      users = topics.slice(0, 4).reduce((acc, { user }) => {
        if (user) {
          acc.push(user);
        }

        return acc;
      }, []);
    }

    return {
      ...forum,
      users,
    };
  });

  return {
    forums: forumResult,
    pageInfo: pageInfo(count, page, pageLimit),
  };
};

module.exports = resolve;
