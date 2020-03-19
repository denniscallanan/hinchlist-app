export const SET_USER_SUCCESS = "SET_USER_SUCCESS";

export function setUser(userInfo) {
  return {
    type: SET_USER_SUCCESS,
    payload: userInfo
  };
}
