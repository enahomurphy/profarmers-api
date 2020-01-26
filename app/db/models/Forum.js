const Sequelize = require('sequelize');

class Forum extends Sequelize.Model {
}

module.exports = (sequelize, dataTypes) => {
  Forum.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: dataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: dataTypes.STRING,
      },
      creatorId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        field: 'creator_id',
        validate: {
          isUUID: 4,
        },
      },
      deleted_at: {
        type: dataTypes.DATE,
      },
      updated_at: {
        type: dataTypes.DATE,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleeted_at',
      tableName: 'forums',
      sequelize,
    },
  );

  return Forum;
};
