import * as Redux from "redux";
import userReducer from "./users";
import favouriteListsReducer from "./favouriteLists";

const reducer = Redux.combineReducers({
  users: userReducer,
  favouriteLists: favouriteListsReducer
});

export default reducer;
