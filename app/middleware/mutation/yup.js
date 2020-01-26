const { GraphQLError } = require('graphql');
const yup = require('yup');

module.exports = async (validationSchema, args) => {
  if (validationSchema) {
    try {
      await validationSchema.validate(args, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new GraphQLError(error);
      }
    }
  }
};
