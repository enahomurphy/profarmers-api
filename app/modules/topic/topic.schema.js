const Topic = `
  extend type Query {
    trendingTopics: [Topic]
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
  }
`;

module.exports = [Topic];
