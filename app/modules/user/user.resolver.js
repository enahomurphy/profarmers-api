module.exports = {
  Query: {
    user: (root, { id }) => ({
      id,
      username: 'jhon',
    }),
  },
};
