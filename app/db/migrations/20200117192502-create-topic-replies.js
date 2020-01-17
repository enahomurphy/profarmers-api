
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('topic_replies', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    text: {
      type: Sequelize.TEXT,
    },
    parent_id: {
      type: Sequelize.UUID,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    topic_id: {
      type: Sequelize.UUID,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('topic_replies'),
};
