const { gql } = require('apollo-server-express');

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
    user: User,
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
  }

  type GoodDeed {
    _id: ID
    host: User
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
    author: String
    commentText: String
    createdAt: String
    likes: Int
    replies: [Reply]
  }

  type Reply {
    _id: ID
    author: String
    replyBody: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    events: [Event]
    event(_id: ID, hostId: ID, attendeeId: ID): Event
    goodDeeds: [GoodDeed]
    goodDeed(_id: ID, hostId: ID, attendeeId: ID): GoodDeed
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent( title: String!, location: String!, description: String!, date: String!, startTime: String!, endTime: String!, url: String!, image: String!): Event
    createGoodDeed(title: String!, deedText: String!, date: String!, location: String!): GoodDeed
    addConnection(connectionId: ID!): User
    removeConnection(connectionId: ID!): User
    addComment(obligationId: ID!, commentText: String!): Event
    addReply(commentId: ID!, replyBody: String!): Comment
    joinEvent(eventId: ID!, attendee: ID!): Event
    leaveEvent(eventId: ID!, attendee: ID!): Event
    cancelEvent(eventId: ID!): [Event]
    joinGoodDeed(goodDeedId: ID!, helperId: ID!): GoodDeed
    leaveGoodDeed(goodDeedId: ID!, helperId: ID!): GoodDeed
    cancelGoodDeed(goodDeedId: ID!): [GoodDeed]
  }
`
module.exports = typeDefs
