import { SET_USER_SUCCESS } from "../actions/users";

const initialState = {
  currentUser: {}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;
