const Sequelize = require('sequelize');

class Conversation extends Sequelize.Model {
}

module.exports = (sequelize, dataTypes) => {
  Conversation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      creatorId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        field: 'creator_id',
        validate: {
          isUUID: 4,
        },
      },
      receiverId: {
        type: dataTypes.INTEGER,
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
