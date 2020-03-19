import * as Redux from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers/root";

function createStore() {
  return Redux.createStore(rootReducer, Redux.applyMiddleware(ReduxThunk));
}

export default createStore;
