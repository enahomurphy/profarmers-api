
const resolve = (root, { id }, { repo }) => repo.Topic.getById(id);

module.exports = {
  resolve,
};
