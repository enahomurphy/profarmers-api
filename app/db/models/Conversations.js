const Sequelize = require('sequelize');

class Conversation extends Sequelize.Model {
}

module.exports = (sequelize, dataTypes) => {
  Conversation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
      },
      creatorId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'creator_id',
        validate: {
          isUUID: 4,
        },
      },
      receiverId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'receiver_id',
        validate: {
          isUUID: 4,
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleeted_at',
    },
  );

  return Conversation;
};
