const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    location: String
    profilePicture: String
    connections: [User]
    events: [Event]
    goodDeeds: [GoodDeed]
    kindlyScore: Int
  }

  type Auth {
    user: User
    token: ID!
  }

  type Event {
    _id: ID
    host: User
    title: String
    attendees: [User]
    location: String
    description: String
    date: String
    startTime: String
    endTime: String
    url: String
    image: String
    comments: [Comment]
    likes: Int
    verify: [Verify]
    isVerified: Boolean
  }

  type GoodDeed {
    _id: ID
    host: User
    title: String
    helper: User
    date: String
    deedText: String
    location: String
    createdAt: String
    comments: [Comment]
    likes: Int
  }

  type Comment {
    _id: ID
    author: User
    commentText: String
    createdAt: String
    likes: Int
    replies: [Reply]
  }

  type Reply {
    _id: ID
    author: User
    replyBody: String
    createdAt: String
  }

  type Verify {
    _id: ID
    event: Event
    verifyNumber: Int
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    events: [Event]
    event(_id: ID): Event
    goodDeeds: [GoodDeed]
    goodDeed(_id: ID): GoodDeed
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      location: String!
    ): Auth
    login(email: String!, password: String!): Auth
    createEvent(
      title: String!
      location: String!
      description: String!
      date: String!
      startTime: String!
      endTime: String!
      url: String!
      image: String!
    ): Event
    createGoodDeed(
      title: String!
      deedText: String!
      date: String!
      location: String!
    ): GoodDeed
    addConnection(connectionId: ID!): User
    removeConnection(connectionId: ID!): User
    addEventComment(eventId: ID, commentText: String!): Event
    addGoodDeedComment(goodDeedId: ID, commentText: String!): GoodDeed
    addReply(commentId: ID!, replyBody: String!): Comment
    joinEvent(eventId: ID!): Event
    leaveEvent(eventId: ID!): Event
    cancelEvent(eventId: ID!): Event
    joinGoodDeed(goodDeedId: ID!): GoodDeed
    leaveGoodDeed(goodDeedId: ID!): GoodDeed
    cancelGoodDeed(goodDeedId: ID!): GoodDeed
    addEventLike(eventId: ID!): Event
    addGoodDeedLike(goodDeedId: ID!): GoodDeed
    removeComment(commentId: ID!, eventId: ID, goodDeedId: ID): Event
    addToVerifyNumber(eventId: ID!): Event
    increaseKindlyScore(arr: [ID]): [User]
    setVerify(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
