const Topic = `
  extend type Query {
    trendingTopics: [Topic]
    topics(forumId: Int, page: Int, sort: String): Topics
    topic(id: ID!): Topic
    replies(topicId: ID, page: Int): Replies
  }

  type Topics {
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
