
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('topics', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.TEXT,
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
