const Sequelize = require('sequelize');

class UserConnection extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  UserConnection.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
      },
      title: {
        type: dataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: dataTypes.STRING,
      },
      userId: {
        type: dataTypes.STRING,
        allowNull: false,
        field: 'user_id',
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
