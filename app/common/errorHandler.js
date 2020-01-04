const get = require('lodash/get');

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

const formater = (path, errors) => ({
  path,
  errors,
});

const formatError = error => {
  const inners = get(error, 'extensions.exception.inner', []);
  const path = get(error, 'path');

  if (inners.length) {
    return formater(
      path,
      formatYup(inners),
    );
  }

  if (/sequelize/gmi.test(get(error, 'extensions.exception.name'))) {
    return formater(
      path,
      formatSequelize(get(error, 'extensions.exception.errors', [])),
    );
  }

  return error;
};

module.exports = {
  formatYup,
  formatSequelize,
  formatError,
  formater,
};
