const graphqlFields = require('graphql-fields');

const resolve = async (_, args, { repo }, info) => {
  const { replies, user } = graphqlFields(info);
  const associations = [];

  if (replies) {
    associations.push('replies');
  }

  if (user) {
    associations.push('user');
  }

  const topics = await repo.Topic.getTrending(associations);
  return topics;
};

module.exports = {
  resolve,
};
