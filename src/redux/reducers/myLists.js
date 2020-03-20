import {
  GET_MY_LISTS_BEGIN,
  GET_MY_LISTS_FAILURE,
  GET_MY_LISTS_SUCCESS
} from "../actions/myLists";

const initialState = {
  error: null,
  loading: false,
  items: []
};

function myListsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_LISTS_SUCCESS:
      return {
        error: null,
        loading: false,
        items: action.payload
      };
    case GET_MY_LISTS_FAILURE:
      return {
        error: action.payload,
        loading: false,
        items: []
      };
    case GET_MY_LISTS_BEGIN:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default myListsReducer;
