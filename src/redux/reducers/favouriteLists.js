import {
  GET_FAVOURITE_LISTS_BEGIN,
  GET_FAVOURITE_LISTS_FAILURE,
  GET_FAVOURITE_LISTS_SUCCESS
} from "../actions/favouriteLists";

const initialState = {
  error: null,
  loading: false,
  items: []
};

function favouriteListsReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_FAVOURITE_LISTS_SUCCESS:
      return {
        error: null,
        loading: false,
        items: action.payload
      };
    case GET_FAVOURITE_LISTS_FAILURE:
      return {
        error: action.payload,
        loading: false,
        items: []
      };
    case GET_FAVOURITE_LISTS_BEGIN:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default favouriteListsReducer;
