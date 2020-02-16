const Auth = `
  type Token {
    token: String!
  }

  type SocialToken {
    token: String!
    signedUp: Boolean!
  }

  extend type Mutation {
    login(email: String!, password: String!): Token!
    signup(email: String!,password: String!): Token!
    socialSignup(type: String!, accessToken: String!): SocialToken!
  }
`;

module.exports = [Auth];
