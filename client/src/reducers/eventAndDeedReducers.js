import {
  ADD_EVENT,
  // REMOVE_EVENT,
  // JOIN_EVENT,
  // LEAVE_EVENT,
  // VERIFY_EVENT,
  // CANCEL_EVENT,
  // REMOVE_GOOD_DEED,
  // JOIN_GOOD_DEED,
  // LEAVE_GOOD_DEED,
  // VERIFY_GOOD_DEED,
  // CANCEL_GOOD_DEED
  // ADD COMMENT
  // ADD REPLY
  // ADD_LIKE
  // REMOVE_LIKE

} from "../utils/actions";

const initialState = {
  user: {},
  events: [],
  connections: [],
  goodDeeds: [],
  comments: [],
  replies: [],
  likes: [],
  kindlyPoints: [],
};

export const eventAndDeedReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
    console.log(...state.events, 'line 34')
      return {
        ...state,
        events: [...action.events, action.payload],
      };

    default:
      return state;

  }
};

