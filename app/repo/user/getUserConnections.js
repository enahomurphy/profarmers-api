const { QueryTypes } = require('sequelize');

const { User, sequelize } = require('../../db/models');

const getConnections = async (userId, { limit, offset }) => {
  const result = await sequelize.query(
    `
      SELECT
        *,
        COUNT(*) AS count
      FROM
            users
      WHERE  (
        SELECT
              COUNT(*)
          FROM
              user_connections
          WHERE
              user_connections.sender_id = :userId AND user_connections.receiver_id = :userId
          OR
              user_connections.sender_id = id AND user_connections.receiver_id = :userId
        ) = 1 AND id != :userId
      GROUP BY id
      LIMIT :limit
      OFFSET :offset
    `,
    {
      replacements: {
        userId,
        limit,
        offset,
      },
      model: User,
      type: QueryTypes.SELECT,
      mapToModel: true,
    },
  );

  const users = result.map(u => u.toJSON());
  const count = parseInt(result.length ? result[0]._previousDataValues.count : 0, 10);

  return [users, count];
};

module.exports = getConnections;
