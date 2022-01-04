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
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $location: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      location: $location
    ) {
      user {
        _id
        firstName
        lastName
        email
        location
        profilePicture
        kindlyScore
      }
      token
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $location: String!
    $description: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $url: String!
    $image: String!
  ) {
    createEvent(
      title: $title
      location: $location
      description: $description
      date: $date
      startTime: $startTime
      endTime: $endTime
      url: $url
      image: $image
    ) {
      _id
      host {
        _id
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
  mutation CreateGoodDeed(
    $title: String!
    $deedText: String!
    $date: String!
    $location: String!
  ) {
    createGoodDeed(
      title: $title
      deedText: $deedText
      date: $date
      location: $location
    ) {
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
      }
      title
      attendees {
        _id
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
      _id
      host {
        _id
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      image
      comments {
        _id
        author {
          _id
        }
        commentText
        likes
        replies {
          _id
          author {
            _id
          }
        }
      }
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
  mutation JoinGoodDeed($goodDeedId: ID!) {
    joinGoodDeed(goodDeedId: $goodDeedId) {
      _id
      title
      deedText
      date
      location
      comments {
        _id
        author {
          _id
          firstName
          lastName
        }
        commentText
        createdAt
      }
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

export const ADD_EVENT_COMMENT = gql`
  mutation Mutation($commentText: String!, $eventId: ID) {
    addEventComment(commentText: $commentText, eventId: $eventId) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      comments {
        _id
        author {
          _id
        }
        commentText
        createdAt
        likes
        replies {
          _id
          replyBody
          author {
            _id
          }
        }
      }
      image
      likes
      verifyNumber
    }
  }
`;

export const ADD_GOOD_DEED_COMMENT = gql`
  mutation AddGoodDeedComment($commentText: String!, $goodDeedId: ID) {
    addGoodDeedComment(commentText: $commentText, goodDeedId: $goodDeedId) {
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
      date
      deedText
      location
      comments {
        _id
        author {
          lastName
          firstName
          _id
        }
        commentText
        createdAt
        likes
        replies {
          _id
          author {
            _id
          }
          replyBody
        }
      }
      likes
    }
  }
`;

export const ADD_REPLY = gql`
  mutation AddReply($commentId: ID!, $replyBody: String!) {
    addReply(commentId: $commentId, replyBody: $replyBody) {
      _id
      commentText
      replies {
        replyBody
        author {
          firstName
        }
      }
    }
  }
`;

export const ADD_EVENT_LIKE = gql`
  mutation addEventLike($eventId: ID!) {
    addEventLike(eventId: $eventId) {
      _id
      title
      location
      description
      likes
    }
  }
`;

export const ADD_GOOD_DEED_LIKE = gql`
  mutation AddGoodDeedLike($goodDeedId: ID!) {
    addGoodDeedLike(goodDeedId: $goodDeedId) {
      _id
      title
      deedText
      location
      likes
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!, $eventId: ID, $goodDeedId: ID) {
    removeComment(
      commentId: $commentId
      eventId: $eventId
      goodDeedId: $goodDeedId
    ) {
      _id
      host {
        _id
      }
      title
      attendees {
        _id
      }
      location
      description
      date
      startTime
      endTime
      url
      image
      comments {
        _id
        author {
          _id
        }
        commentText
        likes
        replies {
          _id
          author {
            _id
          }
          replyBody
        }
      }
    }
  }
`;

// export const ADD_VERIFICATION = gql`
//   mutation Mutation($eventId: ID!) {
//     addToVerifyNumber(eventId: $eventId) {
//       _id
//       host {
//         _id
//       }
//       title
//       attendees {
//         _id
//       }
//       location
//       description
//       date
//       startTime
//       endTime
//       url
//       image
//       comments {
//         _id
//         author {
//           _id
//         }
//         commentText
//         likes
//         replies {
//           _id
//           author {
//             _id
//           }
//           replyBody
//         }
//       }
//       likes
//       verifyNumber
//     }
//   }
// `;

export const ADD_VERIFICATION = gql`
  mutation addToVerifyNumber($eventId: ID!) {
    addToVerifyNumber(eventId: $eventId) {
      _id
      title
      verify {
        _id
        event {
          _id
        }
        verifyNumber
        user {
          _id
        }
      }
    }
  }
`;

export const INCREASE_KINDLY_SCORE = gql`
  mutation increaseKindlyScore($arr: [ID]) {
    increaseKindlyScore(arr: $arr) {
      _id
      firstName
      lastName
      kindlyScore
    }
  }
`;
