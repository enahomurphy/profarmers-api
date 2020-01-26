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
        type: dataTypes.INTEGER,
        autoIncrement: true,
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
        type: dataTypes.INTEGER,
        allowNull: false,
        field: 'creator_id',
      },
      forumId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        field: 'forum_id',
      },
      createdAt: {
        type: dataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: dataTypes.DATE,
        field: 'updated_at',
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
