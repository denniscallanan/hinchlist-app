import {
  GET_FAVOURITE_LISTS_BEGIN,
  GET_FAVOURITE_LISTS_FAILURE,
  GET_FAVOURITE_LISTS_SUCCESS,
  ADD_FAVOURITE_LIST_SUCCESS,
  DELETE_FAVOURITE_LIST_SUCCESS
} from "../actions/favouriteLists";

const initialState = {
  error: null,
  loading: false,
  items: []
};

function favouriteListsReducer(state = initialState, action) {
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
    case ADD_FAVOURITE_LIST_SUCCESS:
      return {
        ...state,
        items:
          state.items.findIndex(x => x.list_id === action.payload) === -1
            ? state.items.concat([action.payload])
            : state.items
      };
    case DELETE_FAVOURITE_LIST_SUCCESS:
      return {
        ...state,
        items: state.items.filter(x => x.list_id !== action.payload)
      };
    default:
      return state;
  }
}

export default favouriteListsReducer;
