const resolve = async (_, args, { repo }) => {
  const topics = await repo.Topic.getRecent();
  return topics;
};

module.exports = {
  resolve,
};
