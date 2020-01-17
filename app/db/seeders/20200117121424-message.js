const faker = require('faker');

module.exports = {
  up: async queryInterface => {
    const messages = [];

    const [users] = await queryInterface.sequelize.query('SELECT id from users');
    const [conversations] = await queryInterface.sequelize.query(
      'SELECT id, creator_id, receiver_id from conversations',
    );
    const userIds = users.map(({ id }) => id);
    let amount = 0;


    while (amount < conversations.length) {
      const count = faker.random.arrayElement([3, 4, 9, 3, 20, 50]);

      for (let index = 0; index < count; index += 1) {
        const conversation = conversations[amount];
        const sender = faker.random.arrayElement([
          conversation.receiver_id,
          conversation.creator_id,
        ]);

        messages.push({
          id: faker.random.uuid(),
          conversation_id: conversation.id,
          sender_id: sender,
          message_type: faker.random.arrayElement(['text', 'image', 'video', 'audio']),
          message: faker.random.arrayElement(userIds),
          attachment_thumb_url: faker.image.imageUrl(100, 100),
          attachment_url: faker.random.arrayElement(['', '', '', faker.image.image()]),
          is_read: faker.random.arrayElement([true, false]),
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      amount += 1;
    }

    return queryInterface.bulkInsert('messages', messages, {});
  },

  down: queryInterface => queryInterface.bulkDelete('messages', null, {}),
};
