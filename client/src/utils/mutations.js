import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      user {
        _id
        firstName
        lastName
        email
      }
      token
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($title: String!, $location: String!, $description: String!, $date: String!, $startTime: String!, $endTime: String!, $url: String!, $image: String!) {
    createEvent(title: $title, location: $location, description: $description, date: $date, startTime: $startTime, endTime: $endTime, url: $url, image: $image) {
      _id
      host {
        _id
        firstName
        lastName
        kindlyScore
      }
      title
      location
      description
      date
      startTime
      endTime
      url
      image
    }
  }
`;

export const CREATE_GOOD_DEED = gql`
 mutation CreateGoodDeed($title: String!, $deedText: String!, $date: String!, $location: String!) {
  createGoodDeed(title: $title, deedText: $deedText, date: $date, location: $location) {
    _id
    title
    date
    deedText
    location
    likes
  }
}
`;

export const ADD_CONNECTION = gql`
  mutation addConnection($connectionId: ID!) {
    addConnection(connectionId: $connectionId) {
      _id
      firstName
      lastName
    }
  }
`;

export const REMOVE_CONNECTION = gql`
  mutation removeConnection($connectionId: ID!) {
    removeConnection(connectionId: $connectionId) {
      _id
      firstName
      lastName
    }
  }
`;

export const JOIN_EVENT = gql`
  mutation joinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      _id
      host {
        _id
        firstName
        lastName
        kindlyScore
      }
      title
      attendees {
        _id
        firstName
        lastName
      }
      location
      description
      date
      startTime
      endTime
      url
      image
    }
  }
`;

export const LEAVE_EVENT = gql`
  mutation leaveEvent($eventId: ID!) {
    leaveEvent(eventId: $eventId) {
    host{
        _id
        firstName
        lastName
        kindlyScore
      }
      title
      attendees {
        _id
        firstName
        lastName
      }
      location
      description
      date
      startTime
      endTime
      url
      image
    }
  }
`;

export const CANCEL_EVENT = gql`
  mutation Mutation($eventId: ID!) {
    cancelEvent(eventId: $eventId) {
      _id
      title
    }
  }
`;

export const CANCEL_GOOD_DEED = gql`
  mutation Mutation($goodDeedId: ID!) {
    cancelGoodDeed(goodDeedId: $goodDeedId) {
      _id
      title
    }
  }
`;

export const JOIN_GOOD_DEED = gql`
  mutation joinGoodDeed($goodDeedId: ID!) {
    joinGoodDeed(goodDeedId: $goodDeedId) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      helper {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const LEAVE_GOOD_DEED = gql`
  mutation LeaveGoodDeed($goodDeedId: ID!) {
    leaveGoodDeed(goodDeedId: $goodDeedId) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      helper {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_COMMENT = gql`
mutation AddComment($goodDeedId: ID, $eventId: ID, $commentText: String!) {
  addComment(goodDeedId: $goodDeedId, eventId: $eventId commentText: $commentText) {
    _id
    comments {
      _id
      author {
        _id
        firstName
      }
      commentText
      replies {
        _id
        author {
          _id
          firstName
          lastName
        }
      }
    }
  }
}`;