const User = `
  extend type Query {
    user(id: String!): User
    me: User
    suggestedConnections(
      limit: Int
      page: Int
    ): SuggestedConnectionsResult
  }

  extend type Mutation {
    updateUser(payload: UserUpdateInput): User
  }

  type SuggestedConnectionsResult {
    suggestions: [User]
    pageInfo: PageInfo
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
