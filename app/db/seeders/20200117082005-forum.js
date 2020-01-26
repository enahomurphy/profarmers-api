const faker = require('faker');

module.exports = {
  up: async queryInterface => {
    const forums = [];
    let amount = 50;

    const [users] = await queryInterface.sequelize.query('SELECT id from users');
    const userIds = users.map(({ id }) => id);

    while (amount) {
      forums.push({
        title: `${faker.lorem.words()} ${amount}`,
        description: faker.lorem.sentence(),
        creator_id: faker.random.arrayElement(userIds),
        created_at: new Date(),
        updated_at: new Date(),
      });

      amount -= 1;
    }

    return queryInterface.bulkInsert('forums', forums, {});
  },

  down: queryInterface => queryInterface.bulkDelete('forums', null, {}),
};
