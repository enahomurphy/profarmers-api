
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    conversation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'id',
      },
    },
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    message_type: {
      type: Sequelize.ENUM('text', 'image', 'video', 'audio'),
      allowNull: false,
      default: 'text',
    },
    message: {
      type: Sequelize.TEXT,
    },
    attachment_thumb_url: {
      type: Sequelize.STRING,
    },
    attachment_url: {
      type: Sequelize.STRING,
    },
    is_read: {
      type: Sequelize.BOOLEAN,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('messages'),
};
