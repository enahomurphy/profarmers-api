const resolve = async (root, { id }, { repo, user }) => {
  const userId = id || user.id;
  const [, connectionCount] = await repo.User.getConnections(userId, { limit: 1 }, true);
  const { count: disscussionCount } = await repo.Topic.getReplies({ userId }, { limit: 1 });
  const [, topicsCount] = await repo.Topic.getAll({ creatorId: userId }, { limit: 1 });

  return {
    connectionCount,
    disscussionCount,
    topicsCount,
  };
};

module.exports = {
  resolve,
};
