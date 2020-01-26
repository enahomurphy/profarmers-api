
const faker = require('faker');
const { Topic } = require('../../app/db/models');


const generateTopic = payload => ({
  title: faker.lorem.words(),
  body: faker.lorem.paragraphs(),
  tags: '',
  ...payload,
});

const generateTopics = (payload, count) => {
  const topics = [];
  let amount = count;

  while (amount) {
    topics.push({
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(),
      tags: '',
      created_at: new Date(),
      updated_at: new Date(),
      ...payload,
    });

    amount -= 1;
  }

  return topics;
};

const seedTopic = (creatorId, forumId, count = 1) => {
  const topics = generateTopics({ creatorId, forumId }, count);
  return Topic.bulkCreate(topics, { returnig: true });
};

module.exports.topics = seedTopic;
module.exports.Model = Topic;
module.exports.destroyAll = () => Topic.destroy({ where: {} });
module.exports.generateTopic = generateTopic;
