const User = `
  extend type Query {
    user(id: String!): User
    me: User
    suggestedConnections(
      limit: Int
      page: Int
    ): SuggestedConnectionsResult
    userConnections(
      limit: Int
      page: Int
    ): UserConnectionsResult
    userInfo(id: Int): UserInfoResult
    userConnection(userId: Int!, connectionId: Int!): Connection
  }

  extend type Mutation {
    updateUser(payload: UserUpdateInput): User
  }

  type UserInfoResult {
    connectionCount: Int
    disscussionCount: Int
    topicsCount: Int
  }

  type UserConnectionsResult {
    connections: [User]
    pageInfo: PageInfo
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
    profileImage: String
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

  type Connection {
    senderId: Int
    receiverId: Int
    accepted: Boolean
  }
`;

module.exports = [User];
