const Sequelize = require('sequelize');

class ReplyTopic extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  ReplyTopic.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
      },
      text: {
        type: dataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      parentId: {
        type: dataTypes.UUID,
        field: 'user_id',
      },
      userId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      topicId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'topic_id',
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'topic_replies',
      sequelize,
    },
  );

  return ReplyTopic;
};
