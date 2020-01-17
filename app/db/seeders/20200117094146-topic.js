const faker = require('faker');

module.exports = {
  up: async queryInterface => {
    const topics = [];
    let amount = 50;

    const [users] = await queryInterface.sequelize.query('SELECT id from users');
    const [forums] = await queryInterface.sequelize.query('SELECT id from forums');
    const userIds = users.map(({ id }) => id);
    const forumsIds = forums.map(({ id }) => id);

    while (amount) {
      topics.push({
        id: faker.random.uuid(),
        title: faker.lorem.words(),
        body: faker.lorem.paragraphs(),
        creator_id: faker.random.arrayElement(userIds),
        forum_id: faker.random.arrayElement(forumsIds),
        tags: '',
        created_at: new Date(),
        updated_at: new Date(),
      });

      amount -= 1;
    }

    return queryInterface.bulkInsert('topics', topics, {});
  },

  down: queryInterface => queryInterface.bulkDelete('topics', null, {}),
};
