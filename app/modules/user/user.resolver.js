const Mutation = require('./mutation');

module.exports = {
  Mutation,
  Query: {
    user: (root, { id }, { repo }) => repo.User.getById(id),
    me: (root, _, { user }) => user,
  },
};
