const moment = require('moment');
const faker = require('faker');

const factory = require('../../factory');
const { getRecent } = require('../../../app/repo/topic');

describe('Recent Topic', () => {
  let user = {};
  let forum = [];
  let topics = [];

  beforeEach(async () => {
    user = await factory.UserFactory.user();
    forum = await factory.ForumFactory.forum(user.id);

    const topicsData = Array(10).fill(1).map((value, index) => {
      const topicToCreate = factory.TopicFactory.generateTopic({
        creatorId: user.id,
        forumId: forum.id,
        updated_at: moment(new Date()).add(1 + index, 'minute'),
      });

      return topicToCreate;
    });

    topics = await factory.TopicFactory.Model.bulkCreate(topicsData, { returning: true });
    const users = await factory.UserFactory.users(10);

    const userIds = users.map(({ id }) => id);
    const topicIds = topics.map(({ id }) => id);
    const topicReplies = [];
    topicIds.forEach((id, index) => {
      const userId = faker.random.arrayElement(userIds);
      const count = faker.random.arrayElement([3, 4]);
      for (let replyCount = 0; replyCount < count; replyCount += 1) {
        if (index <= 2) {
          topicReplies.push(
            factory.TopicReplyFactory.generateReply({
              userId,
              topicId: id,
              updated_at: moment().add(10 - index, 'days'),
            }),
          );
        } else if (index === 8 || index === 9) {
          topicReplies.push(
            factory.TopicReplyFactory.generateReply({
              userId,
              topicId: id,
              updated_at: moment().add(13 - index, 'days'),
            }),
          );
        } else {
          topicReplies.push(
            factory.TopicReplyFactory.generateReply({
              userId,
              topicId: id,
            }),
          );
        }
      }
    });

    await factory.TopicReplyFactory.Model.bulkCreate(topicReplies);
  });

  afterAll(async () => {
    await factory.TopicReplyFactory.destroyAll();
    await factory.TopicFactory.destroyAll();
    await factory.ForumFactory.destroyAll();
    await factory.UserFactory.destroyAll();
  });

  test('should get topics sorted by last reply date', async () => {
    const recentTopics = await getRecent(5);
    const result = [
      topics[0],
      topics[1],
      topics[2],
      topics[8],
      topics[9],
    ];

    result.forEach((resultTopic, index) => {
      expect(resultTopic.id === recentTopics[index].id);
    });
  });

  test('should get the next data when limit and cursor is passed in', async () => {
    const nextTopics = await getRecent(5, 5);
    const result = [
      topics[7],
      topics[6],
      topics[5],
      topics[4],
      topics[3],
    ];

    result.forEach((resultTopic, index) => {
      expect(resultTopic.id === nextTopics[index].id);
    });
  });

  test('should return all dataset if not called with limit add offset', async () => {
    const nextTopics = await getRecent();
    const result = [
      topics[0],
      topics[1],
      topics[2],
      topics[8],
      topics[9],
      topics[7],
      topics[6],
      topics[5],
      topics[4],
      topics[3],
    ];

    result.forEach((resultTopic, index) => {
      expect(resultTopic.id === nextTopics[index].id);
    });
  });
});
