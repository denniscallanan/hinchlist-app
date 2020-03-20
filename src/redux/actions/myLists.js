import { apiRequest } from "../../api/client";

export const GET_MY_LISTS_BEGIN = "GET_MY_LISTS_BEGIN";
export const GET_MY_LISTS_FAILURE = "GET_MY_LISTS_FAILURE";
export const GET_MY_LISTS_SUCCESS = "GET_MY_LISTS_SUCCESS";

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
