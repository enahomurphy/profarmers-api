const yup = require('yup');
const bcrypt = require('bcryptjs');

const { JWT } = require('../../../common');

const validationSchema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
});

const invalidMessage = 'invalid email or password';

const resolve = async (parent, args, { repo, reply }) => {
  const user = await repo.User.getByEmail(
    args.email,
    ['password'],
  );

  if (!user) {
    throw new Error(invalidMessage);
  }

  const { email, id, password } = user;

  const match = await bcrypt.compare(
    args.password,
    password,
  );

  if (!match) {
    throw new Error(invalidMessage);
  }

  const token = JWT.generateToken({ email, id });

  reply.setCookie('jwt', token, {
    path: '/',
    signed: true,
  });

  return { token };
};

module.exports = {
  validationSchema,
  resolve,
};
