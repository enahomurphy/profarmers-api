const Sequelize = require('sequelize');

class TopicReply extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  const User = sequelize.import('./User');

  TopicReply.init(
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
      updatedAt: {
        type: dataTypes.DATE,
        field: 'updated_at',
        get() {
          return new Date(this.getDataValue('updatedAt'));
        },
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

  TopicReply.hasOne(User, { as: 'user', sourceKey: 'userId', foreignKey: 'id' });

  return TopicReply;
};
