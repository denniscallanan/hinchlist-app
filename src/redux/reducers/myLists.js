import {
  GET_MY_LISTS_BEGIN,
  GET_MY_LISTS_FAILURE,
  GET_MY_LISTS_SUCCESS,
  DELETE_MY_LISTS_BEGIN,
  DELETE_MY_LISTS_FAILURE,
  DELETE_MY_LISTS_SUCCESS,
  POST_MY_LISTS_SUCCESS,
  UPDATE_MY_LISTS_SUCCESS
} from "../actions/myLists";

const initialState = {
  error: null,
  loading: false,
  items: []
};

const updateItem = (items, itemToUpdate) => {
  return items.map(item => {
    if (itemToUpdate.list_id === itemToUpdate.list_id) {
      return itemToUpdate;
    }
    return item;
  });
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
    case POST_MY_LISTS_SUCCESS:
      return {
        error: null,
        loading: false,
        items: state.items.concat([action.payload])
      };
    case UPDATE_MY_LISTS_SUCCESS:
      return {
        error: null,
        loading: false,
        items: updateItem(state.items, action.payload)
      };
    case DELETE_MY_LISTS_SUCCESS:
      return {
        error: null,
        loading: false,
        items: state.items.filter(item => item.list_id !== action.payload)
      };
    case DELETE_MY_LISTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case DELETE_MY_LISTS_BEGIN:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default myListsReducer;
