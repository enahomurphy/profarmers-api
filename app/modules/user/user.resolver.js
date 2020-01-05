const Mutation = require('./mutation');

module.exports = {
  Mutation,
  Query: {
    user: (root, { id }, { dataSources }) => dataSources.repo.User.getById(id),
    me: (root, _, { user }) => user,
  },
};
