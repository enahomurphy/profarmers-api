const yup = require('yup');
const axios = require('axios');
const { JWT } = require('../../../common');

const validationSchema = yup.object().shape({
  accessToken: yup.string().min(10).required(),
  type: yup.string().min(5).required(),
});

const getFacebookUser = async accessToken => {
  try {
    const { data } = await axios.get(
      `https://graph.facebook.com/me?fields=email,
        first_name,last_name,picture&access_token=${accessToken}`,
    );
    const {
      email,
      first_name: firstName,
      last_name: lastName,
      picture: { data: { url: profileImage } },
    } = data;

    return {
      email,
      firstName,
      lastName,
      isFacebook: true,
      profileImage,
    };
  } catch (error) {
    throw new Error('Facebook Authenttication failed');
  }
};

const getGoogleUser = async accessToken => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
    );

    const {
      email,
      given_name: firstName,
      family_name: lastName,
      verified_email: verified,
      picture: profileImage,
    } = data;

    return {
      email,
      firstName,
      lastName,
      profileImage,
      verified,
      isGoogle: true,
    };
  } catch (error) {
    throw new Error('Google Authenttication failed');
  }
};

const getSocialData = async (accessToken, type) => {
  switch (type) {
  case 'facebook':
    return getFacebookUser(accessToken);
  case 'google':
    return getGoogleUser(accessToken);
  default:
    throw new Error('Social type is required');
  }
};


const resolve = async (_, args, { repo }) => {
  const socialData = await getSocialData(args.accessToken, args.type);
  let user = await repo.User.getByEmail(socialData.email);
  const signedUp = Boolean(user);

  if (!user) {
    user = await repo.User.add(socialData);
  }

  const token = JWT.generateToken({
    email: user.id,
    id: user.id,
  });

  return { token, signedUp };
};

module.exports = {
  validationSchema,
  resolve,
};
