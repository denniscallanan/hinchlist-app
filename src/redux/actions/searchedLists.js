import { apiRequest } from "../../api/client";

export const SEARCH_LISTS_BEGIN = "SEARCH_LISTS_BEGIN";
export const SEARCH_LISTS_FAILURE = "SEARCH_LISTS_FAILURE";
export const SEARCH_LISTS_SUCCESS = "SEARCH_LISTS_SUCCESS";

export const searchListsBegin = () => ({
  type: SEARCH_LISTS_BEGIN
});

export const searchListsSuccess = lists => ({
  type: SEARCH_LISTS_SUCCESS,
  payload: lists
});

export const searchListsFailure = error => ({
  type: SEARCH_LISTS_FAILURE,
  payload: error
});

export function searchLists(query) {
  return dispatch => {
    const url = "/api/lists/search?query=" + query;
    dispatch(searchListsBegin());

    return apiRequest(url, {
      method: "GET"
    })
      .then(response => {
        return dispatch(searchListsSuccess(response.result.items));
      })
      .catch(error => {
        return dispatch(searchListsFailure(error.message));
      });
  };
}
