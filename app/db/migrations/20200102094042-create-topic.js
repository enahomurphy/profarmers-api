
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      forum_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'forums',
          key: 'id',
        },
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
    });

    await queryInterface.addConstraint('topics', ['id', 'created_at'], {
      type: 'unique',
      name: 'topics_id_created_at',
    });

    await queryInterface.addIndex(
      'topics',
      ['creator_id'],
      {
        type: 'index',
        name: 'topic_creator_id_idx',
      },
    );

    await queryInterface.addIndex(
      'topics',
      ['forum_id'],
      {
        type: 'index',
        name: 'topic_forum_id_idx',
      },
    );
  },
  down: queryInterface => queryInterface.dropTable('topics'),
};
