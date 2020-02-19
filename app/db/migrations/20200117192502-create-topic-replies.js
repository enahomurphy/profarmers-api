
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topic_replies', {
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
    });

    await queryInterface.addConstraint(
      'topic_replies',
      ['topic_id'],
      {
        type: 'index',
        name: 'topic_replies_topic_id_idx',
      },
    );

    await queryInterface.addConstraint(
      'topic_replies',
      ['user_id'],
      {
        type: 'index',
        name: 'topic_replies_user_id_idx',
      },
    );
  },
  down: queryInterface => queryInterface.dropTable('topic_replies'),
};
