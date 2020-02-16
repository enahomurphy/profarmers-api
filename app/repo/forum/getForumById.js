const { Forum } = require('../../db/models');

const getById = async id => {
  const forum = await Forum.findByPk(id);

  if (!forum) {
    return null;
  }

  return forum.toJSON();
};

module.exports = getById;
