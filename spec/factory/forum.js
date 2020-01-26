const faker = require('faker');
const { Forum } = require('../../app/db/models');

const generateForums = (count = 5, userIds = []) => {
  const forums = [];
  let amount = count;

  while (amount) {
    forums.push({
      title: `${faker.lorem.words()} ${amount}`,
      description: faker.lorem.sentence(),
      creatorId: faker.random.arrayElement(userIds),
      created_at: new Date(),
      updated_at: new Date(),
    });

    amount -= 1;
  }

  return Forum.bulkCreate(forums, { returning: true });
};

module.exports.forums = generateForums;
module.exports.forum = async userId => {
  const forum = await generateForums(1, [userId]);

  return forum[0];
};
module.exports.clean = () => Forum.delete();
module.exports.Model = Forum;
module.exports.destroyAll = () => Forum.destroy({ where: {} });
