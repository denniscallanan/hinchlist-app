import { apiRequest } from "../../api/client";

export const GET_FAVOURITE_LISTS_BEGIN = "GET_FAVOURITE_LISTS_BEGIN";
export const GET_FAVOURITE_LISTS_FAILURE = "GET_FAVOURITE_LISTS_FAILURE";
export const GET_FAVOURITE_LISTS_SUCCESS = "GET_FAVOURITE_LISTS_SUCCESS";

export const getFavouriteListsBegin = () => ({
  type: GET_FAVOURITE_LISTS_BEGIN
});

export const getFavouriteListsSuccess = lists => ({
  type: GET_FAVOURITE_LISTS_SUCCESS,
  payload: lists
});

export const getFavouriteListsFailure = error => ({
  type: GET_FAVOURITE_LISTS_FAILURE,
  payload: error
});

export function getFavouriteLists() {
  return dispatch => {
    const url = "/api/lists/favourites";
    dispatch(getFavouriteListsBegin());

    return apiRequest(url, {
      method: "GET"
    })
      .then(response => {
        return dispatch(getFavouriteListsSuccess(response.result.items));
      })
      .catch(error => {
        return dispatch(getFavouriteListsFailure(error.message));
      });
  };
}
