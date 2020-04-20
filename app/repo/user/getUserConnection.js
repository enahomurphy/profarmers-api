const { Op } = require('sequelize');

const { UserConnection } = require('../../db/models');

const getConnection = async (userId, connectionId) => {
  const connection = await UserConnection.findOne({
    where: {
      [Op.or]: [
        {
          sender_id: userId,
          receiver_id: connectionId,
        },
        {
          sender_id: connectionId,
          receiver_id: userId,
        },
      ],
    },
  });

  if (!connection) {
    return null;
  }

  return connection.toJSON();
};

module.exports = getConnection;
