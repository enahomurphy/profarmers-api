const User = `
  extend type Query {
    getAllForums: AllForums
  }

  type Forum {
    id: ID
    title: String
    description: String
    creatorId: ID
    topicCount: Int
    users: [User]
  }

  type AllForums {
    forums: [Forum]
    pageInfo: PageInfo
  }

`;

module.exports = [User];
