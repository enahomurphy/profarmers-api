
const resolve = (root, { id }, { repo }) => repo.User.getById(id);

module.exports = {
  resolve,
};
