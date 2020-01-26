const { pageInfo, parsePagination } = require('../../../lib');

const resolve = async (_, args, { repo, user }) => {
  const [limit, offset, page] = parsePagination(args);
  const [connections, count] = await repo.User.getConnections(
    user.id,
    { limit, offset },
  );

  return {
    connections,
    pageInfo: pageInfo(count, page, limit),
  };
};

module.exports = {
  auth: true,
  resolve,
};
