const Query = require('./query');

module.exports = {
  Query,
  Topic: ({ replyCount, ...args }) => ({
    replyCount: parseInt(replyCount, 10),
    ...args,
  }),
};
