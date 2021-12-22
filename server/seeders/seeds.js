const faker = require('faker');

const db = require('../config/connection');
const { User, Event, GoodDeed } = require('../models');

db.once('open', async () => {
  // await Event.deleteMany({});
  await User.deleteMany({});
  await Event.deleteMany({});
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
    // const events = [];

    userData.push({ firstName, lastName, email, password, username, location, points,  });
  }

  await User.collection.insertMany(userData);
  // console.log(userData, 'user Data!')

  // // create connections
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
    
    const hostId = userId;
    const title = faker.name.title();
    const attendeeArr = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * userData.length);
      const {_id: userId} = userData[randomIndex];
      let attendeeId = userId;

      attendeeArr.push(attendeeId);
    }
    const attendees = attendeeArr;
    // console.log(attendees);
    // console.log(hostId, 'host id')
    const location = faker.address.city();
    const description = faker.lorem.words(Math.round(Math.random() * 30) + 1);
    const date = faker.date.soon();
    const startTime = '12:00';
    const endTime = '2:00';
    const likes = 8;

    eventData.push({ hostId, title, attendees, location, description, date, startTime, endTime, likes });

    // console.log(eventData);
    // await User.updateOne({ _id: hostId.valueOf() }, { $addToSet: { events: _id } });
  }

  await Event.collection.insertMany(eventData);


for(let i = 0; i < eventData.length; i++) {
  const eventId = eventData[i]._id;
  const hostId = eventData[i].hostId;
  //add event to user host

 await User.updateOne({ _id: hostId}, { $addToSet: { events: eventId } });

  //add event to attendee user
  const att = eventData[i].attendees;
  for(let i =0; i< att.length; i++) {
    const userAtt = att[i];
    await User.updateOne({ _id: userAtt}, { $addToSet: { events: eventId}})
  }
}

//add good deeds
let goodDeedData = [];

  for (let i = 0; i < 10; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * userData.length);
    const { _id: userId } = userData[randomUserIndex];
    
    const hostId = userId;
    const title = faker.name.title();
    const attendeeArr = [];
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * userData.length);
      const {_id: userId} = userData[randomIndex];
      let attendeeId = userId;

      attendeeArr.push(attendeeId);
    }
    const attendees = attendeeArr;
    // console.log(attendees);
    // console.log(hostId, 'host id')
    const location = faker.address.city();
    const deedText = faker.lorem.words(Math.round(Math.random() * 30) + 1);
    const likes = 8;



    goodDeedData.push({ hostId, title, attendees, location, deedText, likes });
  }

  await GoodDeed.collection.insertMany(goodDeedData);


for(let i = 0; i < eventData.length; i++) {
  const goodDeedId = goodDeedData[i]._id;
  const hostId = goodDeedData[i].hostId;
  //add event to user host

 await User.updateOne({ _id: hostId}, { $addToSet: { events: goodDeedId } });

  //add event to attendee user
  const att = goodDeedData[i].attendees;
  for(let i =0; i< att.length; i++) {
    const userAtt = att[i];
    await User.updateOne({ _id: userAtt}, { $addToSet: { goodDeeds: goodDeedId}})
  }
}






  


  


    

  // // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
  //   const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

  //   await Thought.updateOne(
  //     { _id: thoughtId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});
