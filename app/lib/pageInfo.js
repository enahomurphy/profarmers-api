module.exports = (totalCount, currentPage, limit) => ({
  page: currentPage + 1,
  totalCount,
  currentPage,
  hasNext: (limit * currentPage) < totalCount,
  count: limit,
});
