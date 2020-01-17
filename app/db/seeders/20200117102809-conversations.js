const faker = require('faker');

module.exports = {
  up: async queryInterface => {
    const conversations = [];

    const [connections] = await queryInterface.sequelize.query(
      'SELECT connector_id, user_id from user_connections',
    );

    const randomizeConversattion = connections.map(connection => {
      const random = faker.helpers.shuffle([
        connection.connector_id, connection.user_id,
      ]);

      return {
        receiver_id: random[0],
        creator_id: random[1],
      };
    });

    let amount = 0;
    while (amount < connections.length) {
      const connection = randomizeConversattion[amount];
      conversations.push({
        id: faker.random.uuid(),
        ...connection,
        created_at: new Date(),
        updated_at: new Date(),
      });

      amount += 1;
    }

    return queryInterface.bulkInsert('conversations', conversations, {});
  },

  down: queryInterface => queryInterface.bulkDelete('conversations', null, {}),
};
