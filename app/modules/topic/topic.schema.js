const Topic = `
  extend type Query {
    trendingTopics: [Topic]
    recentTopics: [Topic]
  }

  type Topic {
    id: ID
    title: String
    body: String
    user: User
    replyCount: Int
    replies: [TopicReply]
  }

  type TopicReply {
    id: ID
    text: String
    user: User
    updatedAt: DateTime
  }
`;

module.exports = [Topic];
