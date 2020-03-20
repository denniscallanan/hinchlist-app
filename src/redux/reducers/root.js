import * as Redux from "redux";
import userReducer from "./users";
import favouriteListsReducer from "./favouriteLists";
import myListsReducer from "./myLists";
import searchListsReducer from "./searchedLists";

const reducer = Redux.combineReducers({
  users: userReducer,
  favouriteLists: favouriteListsReducer,
  myLists: myListsReducer,
  searchedLists: searchListsReducer
});

export default reducer;
