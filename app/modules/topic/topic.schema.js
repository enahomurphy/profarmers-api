const Topic = `
  extend type Query {
    trendingTopics: [Topic]
    recentTopics(forumId: Int, page: Int): RecentTopics
    topic(id: ID!): Topic
    replies(topicId: ID, page: Int): Replies
  }

  type RecentTopics {
    topics: [Topic]
    pageInfo: PageInfo
  }

  type Replies {
    replies: [TopicReply]
    pageInfo: PageInfo
  }

  type Topic {
    id: ID
    title: String
    body: String
    user: User
    forum: Forum
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
