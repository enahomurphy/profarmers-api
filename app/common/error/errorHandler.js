const get = require('lodash/get');
const { formatError, GraphQLError } = require('graphql');

const formatYup = errors => errors.map(e => ({
  path: e.path,
  message: e.message,
}));

const formatSequelize = errors => errors.map(error => {
  if (error.type === 'unique violation') {
    return {
      path: error.path,
      message: `${error.path} already exist`,
    };
  }

  return {
    path: error.path,
    message: error.message,
  };
});

const formater = (errors, message) => ({
  message,
  errors,
});

const errorFormater = error => {
  const inner = get(error, 'inner', []);
  if (inner.length) {
    return formater(
      formatYup(inner),
      'Invalid data',
    );
  }

  const errors = get(error, 'extensions.exception.errors', []);
  const isSequelizValidationErroor = (
    /sequelize/gmi.test(get(error, 'extensions.exception.name')) && errors.length
  );

  if (isSequelizValidationErroor) {
    return formater(
      formatSequelize(errors),
    );
  }

  return error;
};

const defaultErrorHandler = async (err, request, reply) => {
  reply.code(reply.customStatus || 400);
  if (err.errors) {
    const errors = err.errors.map(
      error => {
        if (typeof error.message === 'object') {
          return {
            locations: error.locations,
            path: error.path,
            ...errorFormater(error.message),
            extensions: {
              code: 'yup-error',
            },
          };
        }
        return (
          error instanceof GraphQLError ? formatError(error) : { message: error.message }
        );
      },
    );

    return { errors };
  }
  return {
    errors: [
      { message: err.message },
    ],
  };
};

module.exports = {
  formatYup,
  formatSequelize,
  errorFormater,
  formater,
  defaultErrorHandler,
};
