const yupValidation = require('./yup');

module.exports = async (resolve, root, args, context, info) => {
  const mutationField = info.schema.getMutationType().getFields()[info.fieldName];
  const { validationSchema } = mutationField;
  await yupValidation(validationSchema, args);

  return resolve(root, args, context, info);
};
