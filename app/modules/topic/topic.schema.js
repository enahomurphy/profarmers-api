const Topic = `
  extend type Query {
    trendingTopics: [Topic]
    recentTopics: RecentTopics
  }

  type RecentTopics {
    topics: [Topic]
    pageInfo: PageInfo
  }

  type Topic {
    id: ID
    title: String
    body: String
    user: User
    replyCount: Int
    lastUpdatedAt: DateTime
    replies: [TopicReply]
    users: [User]
  }

  type TopicReply {
    id: ID
    text: String
    user: User
    updatedAt: DateTime
  }
`;

module.exports = [Topic];
