
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_connections', {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    connector_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    accepted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: queryInterface => queryInterface.dropTable('user_connections'),
};
