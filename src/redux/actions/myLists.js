import { apiRequest } from "../../api/client";

export const GET_MY_LISTS_BEGIN = "GET_MY_LISTS_BEGIN";
export const GET_MY_LISTS_FAILURE = "GET_MY_LISTS_FAILURE";
export const GET_MY_LISTS_SUCCESS = "GET_MY_LISTS_SUCCESS";

export const DELETE_MY_LISTS_BEGIN = "DELETE_MY_LISTS_BEGIN";
export const DELETE_MY_LISTS_FAILURE = "DELETE_MY_LISTS_FAILURE";
export const DELETE_MY_LISTS_SUCCESS = "DELETE_MY_LISTS_SUCCESS";

export const UPDATE_MY_LISTS_SUCCESS = "UPDATE_MY_LISTS_SUCCESS";
export const POST_MY_LISTS_SUCCESS = "POST_MY_LISTS_SUCCESS";

export const getMyListsBegin = () => ({
  type: GET_MY_LISTS_BEGIN
});

export const getMyListsSuccess = lists => ({
  type: GET_MY_LISTS_SUCCESS,
  payload: lists
});

export const getMyListsFailure = error => ({
  type: GET_MY_LISTS_FAILURE,
  payload: error
});

export function getMyLists() {
  return dispatch => {
    const url = "/api/lists/mine";
    dispatch(getMyListsBegin());
    return apiRequest(url, {
      method: "GET"
    })
      .then(response => {
        return dispatch(getMyListsSuccess(response.result.items));
      })
      .catch(error => {
        return dispatch(getMyListsFailure(error.message));
      });
  };
}

export const deleteMyListsBegin = () => ({
  type: DELETE_MY_LISTS_BEGIN
});

export const deleteMyListsSuccess = listId => ({
  type: DELETE_MY_LISTS_SUCCESS,
  payload: listId
});

export const deleteMyListsFailure = error => ({
  type: DELETE_MY_LISTS_FAILURE,
  payload: error
});

export function deleteMyLists(listId) {
  return dispatch => {
    const url = "/api/lists/" + listId;
    dispatch(deleteMyListsBegin());
    return apiRequest(url, {
      method: "DELETE"
    })
      .then(() => {
        return dispatch(deleteMyListsSuccess(listId));
      })
      .catch(error => {
        return dispatch(deleteMyListsFailure(error.message));
      });
  };
}

export const updateMyListsSuccess = list => ({
  type: UPDATE_MY_LISTS_SUCCESS,
  payload: list
});

export const postMyListsSuccess = list => ({
  type: POST_MY_LISTS_SUCCESS,
  payload: list
});
