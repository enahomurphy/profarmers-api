
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
      references: {
        model: 'topic_replies',
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    topic_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'topics',
        key: 'id',
      },
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
