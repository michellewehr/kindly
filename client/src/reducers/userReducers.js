import {
  USER_SIGNUP,
  USER_LOGIN,
  USER_LOGOUT,
} from "../utils/actions";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { loading: true, user: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return { loading: true, user: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};


