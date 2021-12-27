import { createStore } from "redux";
import reducer from "../utils/reducers/reducers";

const store = createStore(reducer);

export default store;
