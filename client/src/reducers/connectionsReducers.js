import { ADD_CONNECTION, REMOVE_CONNECTION } from "../utils/actions";

// * Placeholder
export const connectionsReducers = (state = {}, action) => {
   switch (action.type) {
      case ADD_CONNECTION:
         return {};
      case REMOVE_CONNECTION:
         return {};
      default:
         return state;
   }
};

