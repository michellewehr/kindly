import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
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
         kindlyScore
      }
      events {
         _id
         title
         location
         description
         date
         host {
            _id
            firstName
            lastName
            email
            kindlyScore
         }
         attendees {
            _id
            firstName
            lastName
            email
            kindlyScore
         }
         startTime
         endTime
         url
         image
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
               author {
                  _id
                  firstName
                  lastName
               }
               replyBody
               createdAt
            }
         }
      }
      kindlyScore
      goodDeeds {
         _id
         host {
            _id
            firstName
            lastName
            kindlyScore
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
         createdAt
         likes
         comments {
            _id
            commentText
            createdAt
            likes
            author {
               _id
               firstName
               lastName
            }
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
   }
}`;

export const QUERY_USERS = gql`
{
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
         kindlyScore
      }
      events {
         _id
         title
         location
         description
         date
         host {
            _id
            firstName
            lastName
            email
            kindlyScore
         }
         attendees {
            _id
            firstName
            lastName
            email
            kindlyScore
         }
         startTime
         endTime
         url
         image
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
               author {
                  _id
                  firstName
                  lastName
               }
               replyBody
               createdAt
            }
         }
      }
      kindlyScore
      goodDeeds {
         _id
         host {
            _id
            firstName
            lastName
            kindlyScore
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
         createdAt
         likes
         comments {
            _id
            commentText
            createdAt
            likes
            author {
               _id
               firstName
               lastName
            }
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
   }
}`;

export const QUERY_USER = gql`
{
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
         kindlyScore
      }
      events {
         _id
         title
         location
         description
         date
         host {
            _id
            firstName
            lastName
            email
            kindlyScore
         }
         attendees {
            _id
            firstName
            lastName
            email
            kindlyScore
         }
         startTime
         endTime
         url
         image
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
               author {
                  _id
                  firstName
                  lastName
               }
               replyBody
               createdAt
            }
         }
      }
      kindlyScore
      goodDeeds {
         _id
         host {
            _id
            firstName
            lastName
            kindlyScore
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
         createdAt
         likes
         comments {
            _id
            commentText
            createdAt
            likes
            author {
               _id
               firstName
               lastName
            }
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
   }
}`;

export const QUERY_EVENTS = gql`
{
  events {
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
         kindlyScore
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
}`;

export const QUERY_EVENT = gql`
{
  events {
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
         kindlyScore
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
}`;

export const QUERY_GOOD_DEEDS = gql`
{
  goodDeeds {
      _id
       host {
         _id
         firstName
         lastName
         kindlyScore
      }
      title
      helper {
         _id
         firstName
         lastName
         kindlyScore
      }
      date
      deedText
      location
      createdAt
      likes
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
            author {
               _id
               firstName
               lastName
            }
            replyBody
            createdAt
         }
      }
   }
}`;

export const QUERY_GOOD_DEED = gql`
{
  goodDeeds {
      _id
       host {
         _id
         firstName
         lastName
         kindlyScore
      }
      title
      helper {
         _id
         firstName
         lastName
         kindlyScore
      }
      date
      deedText
      location
      createdAt
      likes
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
            author {
               _id
               firstName
               lastName
            }
            replyBody
            createdAt
         }
      }
   }
}`;
