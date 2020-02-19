const { pageInfo } = require('../../../lib');

const resolve = async (_, { limit, page = 1, topicId }, { repo }) => {
  const pageLimit = limit || 20;
  const offset = pageLimit * (page - 1);
  const { replies, count } = await repo.Topic.getReplies({ topicId }, pageLimit, offset);
  return {
    replies,
    pageInfo: pageInfo(count, page, pageLimit),
  };
};

module.exports = resolve;
