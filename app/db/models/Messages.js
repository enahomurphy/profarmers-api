const Sequelize = require('sequelize');

class Message extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  Message.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
      },
      conversationId: {
        type: dataTypes.UUID,
        field: 'conversation_id',
        allowNull: false,
        validate: {
          isUUID: 4,
        },
      },
      senderId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'sender_id',
        validate: {
          isUUID: 4,
        },
      },
      messageType: {
        type: dataTypes.ENUM('text', 'image', 'video', 'audio'),
        allowNull: false,
        field: 'message_type',
        default: 'text',
      },
      message: {
        type: dataTypes.TEXT,
      },
      attachmentThumbUrl: {
        type: dataTypes.STRING,
        field: 'attachment_thumb_url',
        validate: {
          isUrl: true,
        },
      },
      attachmentUrl: {
        type: dataTypes.STRING,
        field: 'attachment_url',
        validate: {
          isUrl: true,
        },
      },
      isRead: {
        type: dataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_read',
      },
    },
    {
      tableName: 'messages',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Message;
};
