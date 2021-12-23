const { gql } = require('apollo-server-express')

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
    goodDeeds: [goodDeed]
    kindlyScore: Int
  }

  type Auth {
    user: User,
    token: ID!
  }

  type Event {
    _id: ID
    host: [User]
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

  type goodDeed {
    _id: ID
    host: ID
    helpers: [User]
    deedText: String
    createdAt: String
    comments: [Comment]
    likes: Int
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    likes: Int
    replies: [Reply]
  }

  type Reply {
    _id: ID
    replyBody: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    events: [Event]
    event(_id: ID, hostId: ID, attendeeId: ID): Event
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createEvent(host: String, title: String!, location: String!, description: String!, date: String!, startTime: String!, endTime: String!, url: String!, image: String!): Event
  }
`
module.exports = typeDefs
