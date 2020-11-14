import { combineReducers } from "redux";
import auth from "./auth";
import cart from "./cart";
import search from "./search";

const rootReducer = combineReducers({
  auth,
  cart,
  search,
});

export default rootReducer;
