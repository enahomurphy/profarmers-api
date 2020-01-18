const Sequelize = require('sequelize');


class Topic extends Sequelize.Model {}

module.exports = (sequelize, dataTypes) => {
  const TopicReply = sequelize.import('./topicReply');
  const Forum = sequelize.import('./Forum');
  const User = sequelize.import('./User');

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
      body: {
        type: dataTypes.STRING,
      },
      creatorId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'creator_id',
      },
      forumId: {
        type: dataTypes.UUID,
        allowNull: false,
        field: 'forum_id',
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'topics',
      sequelize,
    },
  );

  Topic.hasMany(TopicReply, { as: 'replies', foreignKey: 'topicId' });
  Topic.belongsTo(Forum, { as: 'forum', foreignKey: 'forumId' });
  Topic.belongsTo(User, { as: 'user', foreignKey: 'creatorId' });

  return Topic;
};
