const resolve = async (_, { userId, connectionId }, { repo }) => {
  const connection = await repo.User.getConnection(
    userId,
    connectionId,
  );

  return {
    ...connection,
  };
};

module.exports = {
  auth: true,
  resolve,
};
