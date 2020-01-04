const { User } = require('../../db/models');

const getById = async id => User.findByPk(id);

module.exports = getById;
