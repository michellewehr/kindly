const faker = require('faker');

const db = require('../config/connection');
const { User, Event, GoodDeed, Comment } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Event.deleteMany({});
  await GoodDeed.deleteMany({});
  await Comment.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.internet.userName();
    const location = faker.address.city();
    const points = faker.datatype.number(100)
    const profilePicture = faker.image.image();

    userData.push({ firstName, lastName, email, password, username, location, points, profilePicture });
  }

  await User.collection.insertMany(userData);

  // create connections
  for (let i = 0; i < 10; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { _id: userId } = userData[randomUserIndex];

    let connectionId = userId;

    while (connectionId === userId) {
      const randomUserIndex = Math.floor(Math.random() * userData.length);
      connectionId = userData[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { connections: connectionId } });
  }

  //create events
  let eventData = [];

  for (let i = 0; i < 10; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { _id: userId } = userData[randomUserIndex];

    const host = userId;
    const title = faker.name.title();
    const attendeeArr = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * userData.length);
      const { _id: userId } = userData[randomIndex];
      let attendeeId = userId;
      if (attendeeId !== host) {
        attendeeArr.push(attendeeId);
      }
    }
    const attendees = attendeeArr;
    // console.log(attendees);
    // console.log(hostId, 'host id')
    const location = faker.address.city();
    const description = faker.lorem.words(Math.round(Math.random() * 30) + 1);
    const date = faker.date.soon();
    const startTime = '12:00';
    const endTime = '2:00';
    const likes = faker.datatype.number(20);
    const url = faker.internet.url();
    const image = faker.image.image();

    eventData.push({ host, title, attendees, location, description, date, startTime, endTime, likes, url, image });

  }

  await Event.collection.insertMany(eventData);


  for (let i = 0; i < eventData.length; i++) {
    const eventId = eventData[i]._id;
    const hostId = eventData[i].host;
    //add event to user host

    await User.updateOne({ _id: hostId }, { $addToSet: { events: eventId } });

    //add event to attendee user
    const att = eventData[i].attendees;
    for (let i = 0; i < att.length; i++) {
      const userAtt = att[i];
      await User.updateOne({ _id: userAtt }, { $addToSet: { events: eventId } })
    }
  }

  //add good deeds
  let goodDeedData = [];

  for (let i = 0; i < 10; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { _id: userId } = userData[randomUserIndex];

    const host = userId;
    const title = faker.name.title();
    const helpersArr = [];
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * userData.length);
      const { _id: userId } = userData[randomIndex];
      let helperId = userId;

      helpersArr.push(helperId);
    }
    const helpers = helpersArr;
    const location = faker.address.city();
    const date = faker.date.soon();
    const deedText = faker.lorem.words(Math.round(Math.random() * 30) + 1);
    const likes = faker.datatype.number(20);

    goodDeedData.push({ host, title, helpers, location, deedText, likes, date });
  }

  await GoodDeed.collection.insertMany(goodDeedData);


  for (let i = 0; i < goodDeedData.length; i++) {
    const goodDeedId = goodDeedData[i]._id;
    const hostId = goodDeedData[i].host;
    //add good deeds to user host

    await User.updateOne({ _id: hostId }, { $addToSet: { events: goodDeedId } });

    //add good deed to helper user
    const att = goodDeedData[i].helpers;
    for (let i = 0; i < att.length; i++) {
      const userHelper = att[i];
      await User.updateOne({ _id: userHelper }, { $addToSet: { goodDeeds: goodDeedId } })
    }
  }

  //seed comments for events
  let commentData = [];

  for (let i = 0; i < 10; i++) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const randomIndex = Math.floor(Math.random() * userData.length);
    const username = userData[randomIndex].username;

    const likes = faker.datatype.number(20);
    //get event Id to add comments to event
    const randomIndexEvents = Math.floor(Math.random() * eventData.length);
    const eventId = eventData[randomIndexEvents]._id;

    const createdComment = await Comment.create({ commentText, username, likes });

    //add to event model
    await Event.updateOne(
      { _id: eventId },
      { $push: { comments: createdComment._id } }
    )
    commentData.push(createdComment);
  }
  // TODO: seed comments for good deeds
  //seed comment for good deeds
  for (let i = 0; i < 10; i++) {
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 2);

    const randomIndex = Math.floor(Math.random() * userData.length);
    const username = userData[randomIndex].username;
    const likes = faker.datatype.number(20);
    const randomIndexDeeds = Math.floor(Math.random() * goodDeedData.length);

    const goodDeedId = goodDeedData[randomIndexDeeds]._id;
    const createDeedComments = await Comment.create({ commentText, username, likes });

    await GoodDeed.updateOne(
      { _id: goodDeedId },
      { $push: { comments: createDeedComments._id } }
    )

    commentData.push(createDeedComments);
  }

  //create replies
  for (let i = 0; i < 100; i += 1) {
    const replyBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { username } = userData[randomUserIndex];

    const randomThoughtIndex = Math.floor(Math.random() * commentData.length);
    const { _id: commentId } = commentData[randomThoughtIndex];

    await Comment.updateOne(
      { _id: commentId },
      { $push: { replies: { replyBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
