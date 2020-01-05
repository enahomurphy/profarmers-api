const yup = require('yup');
const pick = require('lodash/pick');

const schema = yup.object().shape({
  salutation: yup.string().max(4),
  fullName: yup.string().min(2).max(500),
  phone: yup.string().min(11).max(11),
  bio: yup.string(),
  occupation: yup.string(),
  personal: yup.string(),
});

const update = async (_, args, { dataSources, user }) => {
  await schema.validate(args, { abortEarly: false });

  const userObject = pick(
    args.payload,
    ['salutation', 'fullName', 'phone', 'bio', 'occupation', 'personal'],
  );

  if (userObject.fullName) {
    const [firstName, lastName] = userObject.fullName.split(/\s+/);
    userObject.firstName = firstName;
    userObject.lastName = lastName;
  }

  const updatedUser = await dataSources.repo.User.updateById(
    user.id,
    userObject,
  );

  return updatedUser;
};

module.exports = update;
