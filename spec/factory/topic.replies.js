const faker = require('faker');
const { TopicReply } = require('../../app/db/models');


const generateReply = payload => ({
  text: faker.lorem.paragraphs(),
  created_at: new Date(),
  updated_at: new Date(),
  ...payload,
});


const generateTopicReplies = (userId, topicId, count = 1) => {
  const topics = [];
  let amount = count;

  while (amount) {
    topics.push({
      text: faker.lorem.paragraphs(),
      user_id: userId,
      topic_id: topicId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    amount -= 1;
  }

  return TopicReply.bulkCreate(topics, { returning: true });
};

module.exports.topics = generateTopicReplies;
module.exports.destroyAll = () => TopicReply.destroy({ where: {} });
module.exports.generateReply = generateReply;
module.exports.Model = TopicReply;
