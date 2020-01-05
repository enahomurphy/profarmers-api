const User = `
  extend type Query {
    user(id: String!): User
    me: User
  }

  extend type Mutation {
    updateUser(payload: UserUpdateInput): User
  }

  input UserUpdateInput {
    salutation: String
    fullName: String
    phone: String
    bio: String
    occupation: String
    personal: String
  }

  type User {
    id: ID!
    fullName: String
    email: String
    verified: Boolean
    profileImage: String
    occupation: String
    personal: String
    bio: String
  }
`;

module.exports = [User];
