
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('topics', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING,
    },
    creator_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    forum_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    tags: {
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('topics'),
};
