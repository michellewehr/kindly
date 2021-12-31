import { combineReducers } from "redux";
import { connectionsReducers } from "./connectionsReducers";
import { eventAndDeedReducers } from "./eventAndDeedReducers";
import { userLoginReducer, userSignupReducer } from "./userReducers";

export default combineReducers({
   connectionsReducers,
   eventAndDeedReducers,
   userLoginReducer,
   userSignupReducer
});