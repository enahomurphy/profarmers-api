const faker = require('faker');

module.exports = {
  up: async queryInterface => {
    const conversations = [];

    const [connections] = await queryInterface.sequelize.query(
      'SELECT sender_id, receiver_id from user_connections',
    );

    const randomizeConversation = connections.map(connection => {
      const random = faker.helpers.shuffle([
        connection.receiver_id, connection.sender_id,
      ]);

      return {
        creator_id: random[0],
        receiver_id: random[1],
      };
    });

    let amount = 0;

    while (amount < connections.length) {
      const connection = randomizeConversation[amount];
      conversations.push({
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
