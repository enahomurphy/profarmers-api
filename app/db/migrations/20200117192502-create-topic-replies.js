
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('topic_replies', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.TEXT,
    },
    parent_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'topic_replies',
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    topic_id: {
      type: Sequelize.INTEGER,
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
