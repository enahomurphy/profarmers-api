const yup = require('yup');

const { JWT } = require('../../../common');

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
});

const signup = async (_, args, { dataSources }) => {
  await schema.validate(args, { abortEarly: false });

  const { email, id } = await dataSources.repo.User.add(args);

  return {
    token: JWT.generateToken({ email, id }),
  };
};

module.exports = signup;
