const { pageInfo, parsePagination } = require('../../../lib');


const resolve = async (_, args, { repo, user }) => {
  const [limit, offset, page] = parsePagination(args);
  const [suggestions, count] = await repo.User.getSuggestions(
    user.id,
    { limit, offset },
  );

  return {
    suggestions,
    pageInfo: pageInfo(count, page, limit),
  };
};

module.exports = {
  resolve,
};
