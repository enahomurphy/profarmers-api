const Auth = `
  type Token {
    token: String!
  }

  extend type Mutation {
    login(email: String!, password: String!): Token!
    signup(email: String!, password: String!): Token!
  }
`;

module.exports = [Auth];
