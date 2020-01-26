const Sequelize = require('sequelize');

class UserConnection extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  UserConnection.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      senderId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id',
      },
      receiverId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        field: 'receiver_id',
      },
      accepted: {
        type: dataTypes.BOOLEAN,
        allowNull: false,
        field: 'sender_id',
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'user_connections',
      sequelize,
    },
  );

  return UserConnection;
};
