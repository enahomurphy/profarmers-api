const User = `
  extend type Query {
    forums(page: Int): Forums
    forum(id: Int): Forum
  }

  type Forum {
    id: ID
    title: String
    description: String
    creatorId: ID
    topicCount: Int
    users: [User]
  }

  type Forums {
    forums: [Forum]
    pageInfo: PageInfo
  }

`;

module.exports = [User];
