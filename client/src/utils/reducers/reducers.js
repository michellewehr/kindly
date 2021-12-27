import {
  ADD_EVENT,
  REMOVE_EVENT,
  JOIN_EVENT,
  LEAVE_EVENT,
  VERIFY_EVENT,

} from "../actions";

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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

      default:
        return state;

  }
};

export default reducer;
