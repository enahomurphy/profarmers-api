const faker = require('faker');

module.exports = {
  up: queryInterface => {
    const users = [];
    const amount = 50;

    for (let index = 0; index < amount; index += 1) {
      users.push({
        id: faker.random.uuid(),
        salutation: faker.name.prefix(),
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        bio: faker.name.jobDescriptor(),
        email: faker.internet.email(),
        phone: faker.name.prefix(),
        password: 'test1234',
        occupation: faker.name.prefix(),
        profile_image: faker.image.imageUrl(100, 100),
        created_at: new Date(),
        updated_at: new Date(),
        city: 'yaba',
        state: 'lagos',
        country: 'nigeria',
        personal: 'marketer',
      });
    }

    return queryInterface.bulkInsert('users', users, {});
  },

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
