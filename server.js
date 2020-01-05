const winston = require('winston');
const fastly = require('fastify');
const { ApolloServer } = require('apollo-server-fastify');

const { LoadSchema } = require('./app/common/graphql');
const { formatError } = require('./app/common/errorHandler');
const repo = require('./app/repo');
const { JWT } = require('./app/common');

const app = fastly();

const port = process.env.PORT || 4000;

LoadSchema()
  .then(schema => {
    const server = new ApolloServer({
      schema,
      dataSources: () => ({
        repo,
      }),
      formatError,
      context: async ({ req }) => {
        const tokenWithBearer = req.headers.authorization || '';
        const token = tokenWithBearer.split(' ')[1];
        let user = JWT.decode(token);

        if (user) {
          user = await repo.User.getById(user.id);
        }

        return {
          user,
        };
      },
    });

    (async function init() {
      app.register(server.createHandler());
      await app.listen(port, '0.0.0.0');
      winston.info(`profarmers service is running on port ${port}`);
    }());
  })
  .catch(error => {
    winston.error('unable to start server', error);
  });

module.exports = app;
