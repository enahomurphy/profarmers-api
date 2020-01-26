
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_connections', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
    });

    return queryInterface.addConstraint('user_connections', ['sender_id', 'receiver_id'], {
      type: 'unique',
      name: 'user_connections_creator_reciever',
    });
  },
  down: queryInterface => queryInterface.dropTable('user_connections'),
};
