import { createStore } from "redux";
import reducer from "../utils/reducers/reducers";

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

// store.subscribe(() => console.log(store.getState()));

export default store;
