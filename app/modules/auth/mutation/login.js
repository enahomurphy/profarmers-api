const yup = require('yup');
const bcrypt = require('bcryptjs');
const { ApolloError } = require('apollo-server-fastify');

const { JWT } = require('../../../common');


const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
});

const invalidMessage = 'invalid email or password';

const login = async (parent, args, { dataSources }) => {
  await schema.validate(args, { abortEarly: false });

  const user = await dataSources.repo.User.getByEmail(
    args.email,
    ['password'],
  );

  if (!user) {
    throw new ApolloError(invalidMessage, 400);
  }

  const { email, id, password } = user;

  const match = await bcrypt.compare(
    args.password,
    password,
  );

  if (!match) {
    throw new ApolloError(invalidMessage, 400);
  }

  return {
    token: JWT.generateToken({ email, id }),
  };
};

module.exports = login;
