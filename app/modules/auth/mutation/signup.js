const yup = require('yup');

const { JWT } = require('../../../common');

const validationSchema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
});

const resolve = async (_, args, { repo, reply }) => {
  const user = await repo.User.getByEmail(args.email);

  if (user) {
    throw new Error('user with email already exist');
  }

  const { email, id } = await repo.User.add(args);

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
