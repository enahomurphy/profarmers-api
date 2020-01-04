const User = `
  extend type Query {
    user(id: ID!): User
  }

  type User {
    id: ID!
    fullName: String
    email: String
    verified: Boolean
    profileImage: String
    occupation: String
    personal: String
  }
`;

module.exports = [User];
