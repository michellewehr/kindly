const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  // await Event.deleteMany({});
  await User.deleteMany({});

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

    userData.push({ firstName, lastName, email, password, username, location, points });
  }

  await User.collection.insertMany(userData);

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
