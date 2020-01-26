const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    const users = [];
    const amount = 50;

    for (let index = 0; index < amount; index += 1) {
      users.push({
        salutation: faker.name.prefix(),
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        bio: faker.name.jobDescriptor(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.name.prefix(),
        password: bcrypt.hashSync('test1234'),
        occupation: faker.name.prefix(),
        profile_image: `https://randomuser.me/api/portraits/${
          faker.random.arrayElement(['men', 'women'])
        }/${faker.random.number({ min: 1, max: 50 })}.jpg`,
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
