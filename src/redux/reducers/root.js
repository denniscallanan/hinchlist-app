import * as Redux from "redux";
import userReducer from "./users";

const reducer = Redux.combineReducers({
  users: userReducer
});

export default reducer;
