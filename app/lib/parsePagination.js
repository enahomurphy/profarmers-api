module.exports = ({ limit = 20, page = 1 }) => {
  const pageLimit = limit || 20;
  const offset = pageLimit * ((page < 0 ? 1 : page) - 1);

  return [pageLimit, offset, page];
};
