
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('conversations', {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    creator_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    receiver_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
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
  down: queryInterface => queryInterface.dropTable('conversations'),
};
