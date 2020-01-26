const formatEdge = require('./formatEdge');

module.exports = (lastDoc, hasNextPage = true) => {
  let nextCursor;

  if (lastDoc) {
    nextCursor = formatEdge(lastDoc).cursor;
  }

  return {
    nextCursor,
    hasNextPage,
  };
};
