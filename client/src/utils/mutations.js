import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($events: [ID]! {
    addEvent(events: $events) {
      id
      title
      description
      location
      date
      startTime
      endTime
      url
      image
      host {
          id
          name
        }
    }
  }
`;

