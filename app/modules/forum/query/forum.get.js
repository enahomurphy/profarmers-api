const resolve = async (_, { id }, { repo }) => {
  const forum = (await repo.Forum.getById(id));
  return forum;
};

module.exports = resolve;
