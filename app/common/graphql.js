/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const { join } = require('path');
const { readdir } = require('fs');
const { promisify } = require('util');
const { DateTimeResolver } = require('graphql-scalars');
const { applyMiddleware } = require('graphql-middleware');

const MutationMiddleWare = require('../middleware/mutation');
const QueryMiddleWare = require('../middleware/query');

const readdirPromise = promisify(readdir);

const Query = `
  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty(id: String): String,
  }

  type PageInfo {
    page: Int
    totalCount: Int
    currentPage: Int
    hasNext: Boolean
    count: Int
  }
`;

const Resolver = {
  Mutation: {
    _empty: () => '',
  },
  Query: {
    _empty: () => '',
  },
};

const modulesDir = '../modules';

const LoadSchema = async (options = {}) => {
  const directorys = await readdirPromise(join(__dirname, modulesDir));

  const gqlSchema = directorys.reduce((acc, value) => {
    const {
      schema,
      resolver,
    } = require(`${modulesDir}/${value}`);
    acc.typeDefs.push(...schema);
    acc.resolvers.push(resolver);

    return acc;
  }, { typeDefs: [Query], resolvers: [] });


  const schema = makeExecutableSchema({
    typeDefs: gqlSchema.typeDefs,
    resolvers: merge(Resolver, ...gqlSchema.resolvers, { DateTime: DateTimeResolver }),
    ...options,
  });

  return applyMiddleware(
    schema,
    {
      Mutation: MutationMiddleWare,
      Query: QueryMiddleWare,
    },
  );
};

module.exports = {
  LoadSchema,
};
