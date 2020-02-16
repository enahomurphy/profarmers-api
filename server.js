const winston = require('winston');
const fastly = require('fastify');

const GQL = require('fastify-gql');
const { applyMiddleware } = require('graphql-middleware');
const { LoadSchema } = require('./app/common/graphql');
const { defaultErrorHandler } = require('./app/common/error');

const repo = require('./app/repo');
const { JWT } = require('./app/common');

const app = fastly();
app.register(require('fastify-cookie'), {
  secret: process.env.SECRET,
  parseOptions: {},
});

app.use(require('cors')());


const port = process.env.PORT || 4000;

LoadSchema()
  .then(schema => {
    const gql = {
      schema: applyMiddleware(
        schema,
      ),
      graphiql: 'playground',

      errorHandler: defaultErrorHandler,
      context: async ({ req }) => {
        const tokenWithBearer = req.headers.authorization || '';
        const token = tokenWithBearer.split(' ')[1];
        let user = JWT.decode(token);

        if (user) {
          user = await repo.User.getById(user.id);
        }

        return {
          user,
          repo,
        };
      },
    };

    (async function init(gqlConfig) {
      app.register(GQL, gqlConfig);
      await app.listen(port, '0.0.0.0');
      winston.info(`profarmers service is running on port ${port}`);
    }(gql));
  })
  .catch(error => {
    winston.error('unable to start server', error);
  });

module.exports = app;
