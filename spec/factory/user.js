const faker = require('faker');
const bcrypt = require('bcryptjs');
const { User } = require('../../app/db/models');

const generateUsers = (count = 10) => Array(count).fill(1).map(() => ({
  salutation: faker.name.prefix(),
  firstName: faker.name.firstName(),
  lastName: faker.name.firstName(),
  bio: faker.name.jobDescriptor(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.name.prefix(),
  password: bcrypt.hashSync('test1234'),
  occupation: faker.name.prefix(),
  profileImage: `https://randomuser.me/api/portraits/${
    faker.random.arrayElement(['men', 'women'])
  }/${faker.random.number({ min: 1, max: 50 })}.jpg`,
  city: 'yaba',
  state: 'lagos',
  country: 'nigeria',
  personal: 'marketer',
}));

const users = count => {
  const usersData = generateUsers(count);

  return User.bulkCreate(usersData, { returning: true });
};

module.exports.users = users;
module.exports.user = async () => {
  const [user] = await users(1);

  return user;
};
module.exports.destroyAll = () => User.destroy({ where: {} });
