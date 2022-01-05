import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      location
      profilePicture
      connections {
        _id
        firstName
        lastName
      }
      events {
        _id
        host {
          _id
          firstName
          lastName
        }
        title
        location
        description
        date
        startTime
        endTime
        url
        image
        attendees {
          _id
        }
      }
      goodDeeds {
        _id
        host {
          _id
          firstName
          lastName
        }
        title
        date
        deedText
        location
        likes
      }
      kindlyScore
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      firstName
      lastName
      email
      location
      profilePicture
      connections {
        _id
        firstName
        lastName
      }
      events {
        _id
        host {
          _id
          firstName
          lastName
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
      goodDeeds {
        _id
        host {
          _id
          firstName
          lastName
        }
        title
        date
        deedText
        location
        likes
      }
      kindlyScore
    }
  }
`;

export const QUERY_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      email
      location
      profilePicture
      connections {
        _id
        firstName
        lastName
      }
      events {
        _id
        host {
          lastName
          firstName
          _id
        }
        title
        attendees {
          _id
        }
        location
        description
        startTime
        date
        endTime
        url
        image
        comments {
          _id
        }
        likes
        verify {
          _id
          user {
            _id
          }
          event {
            _id
          }
          verifyNumber
        }
      }
      goodDeeds {
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
        }
        likes
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  {
    events {
      _id
      host {
        _id
        firstName
        lastName
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
      isVerified
      startTime
      verify {
        _id
        user {
          _id
        }
        event {
          _id
        }
        verifyNumber
      }
      endTime
      url
      image
      comments {
        _id
        commentText
        createdAt
        replies {
          _id
          replyBody
        }
        author {
          _id
          firstName
          lastName
        }
        likes
      }
      likes
    }
  }
`;

export const QUERY_EVENT = gql`
  query Event($id: ID) {
    event(_id: $id) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      attendees {
        _id
        firstName
        lastName
      }
      location
      isVerified
      description
      date
      startTime
      endTime
      url
      image
      comments {
        _id
        author {
          lastName
          firstName
          _id
        }
        likes
        replies {
          _id
          author {
            firstName
            _id
            lastName
          }
          replyBody
          createdAt
        }
        commentText
        createdAt
      }
      likes
      verify {
        _id
        user {
          _id
        }
        event {
          _id
        }
        verifyNumber
      }
    }
  }
`;

export const QUERY_GOOD_DEEDS = gql`
  {
    goodDeeds {
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
          _id
          firstName
          lastName
        }
        commentText
        likes
        replies {
          _id
          replyBody
          author {
            _id
          }
        }
      }
      likes
    }
  }
`;

export const QUERY_GOOD_DEED = gql`
  query GoodDeed($id: ID) {
    goodDeed(_id: $id) {
      _id
      host {
        _id
        firstName
        lastName
      }
      title
      helper {
        _id
      }
      date
      deedText
      location

      comments {
        _id
        author {
          _id
          firstName
          lastName
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
      likes
    }
  }
`;

export const QUERY_COMMENTS = gql`
  {
    comments {
      _id
      author {
        _id
        firstName
        lastName
      }
      commentText
      createdAt
      likes
      replies {
        _id
        replyBody
        createdAt
        author {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;
