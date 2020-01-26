const faker = require('faker');

const { utils } = require('../../lib');

module.exports = {
  up: async queryInterface => {
    const userConnections = [];

    const [users] = await queryInterface.sequelize.query('SELECT id from users');
    const userIds = users.map(({ id }) => id);
    const mergedUsers = utils.connectionCreation(userIds).map(([receiverId, senderId]) => ({
      receiver_id: receiverId,
      sender_id: senderId,
    }));

    let amount = 0;

    while (amount < mergedUsers.length) {
      const connection = mergedUsers[amount];
      userConnections.push({
        ...connection,
        accepted: faker.random.arrayElement([true, false]),
        created_at: new Date(),
        updated_at: new Date(),
      });

      amount += 1;
    }
    return queryInterface.bulkInsert('user_connections', userConnections, {});
  },

  down: queryInterface => queryInterface.bulkDelete('user_connections', null, {}),
};
