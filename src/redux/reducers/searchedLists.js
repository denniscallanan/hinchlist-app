import {
  SEARCH_LISTS_BEGIN,
  SEARCH_LISTS_FAILURE,
  SEARCH_LISTS_SUCCESS
} from "../actions/searchedLists";

const initialState = {
  error: null,
  loading: false,
  items: []
};

function searchListsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LISTS_SUCCESS:
      return {
        error: null,
        loading: false,
        items: action.payload
      };
    case SEARCH_LISTS_FAILURE:
      return {
        error: action.payload,
        loading: false,
        items: []
      };
    case SEARCH_LISTS_BEGIN:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default searchListsReducer;
