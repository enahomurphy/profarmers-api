const Sequelize = require('sequelize');

class Topic extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  Topic.init(
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
        type: dataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'forums',
      sequelize,
    },
  );

  return Topic;
};
