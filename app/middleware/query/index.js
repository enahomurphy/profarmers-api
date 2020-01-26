module.exports = async (resolve, root, args, context, info) => {
  const { auth } = info.schema.getQueryType().getFields()[info.fieldName];

  if (auth) {
    if (!context.user) {
      context.reply.customStatus = 401;
      throw new Error('You must be logged in to perform this operation');
    }
  }

  return resolve(root, args, context, info);
};
