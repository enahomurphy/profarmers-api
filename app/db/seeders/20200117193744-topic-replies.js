const faker = require('faker');

module.exports = {
  up: async queryInterface => {
    const topicReplies = [];

    const [users] = await queryInterface.sequelize.query('SELECT id from users');
    const [topics] = await queryInterface.sequelize.query('SELECT id from topics');
    const userIds = users.map(({ id }) => id);
    const topicIds = topics.map(({ id }) => id);
    let amount = topicIds.length - 1;

    while (amount) {
      const count = faker.random.arrayElement([50, 30, 25]);
      const topicId = topicIds[amount];

      for (let index = 0; index < count; index += 1) {
        topicReplies.push({
          text: faker.lorem.paragraphs(),
          user_id: faker.random.arrayElement(userIds),
          topic_id: topicId,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      amount -= 1;
    }

    return queryInterface.bulkInsert('topic_replies', topicReplies, {});
  },

  down: queryInterface => queryInterface.bulkDelete('topic_replies', null, {}),
};
