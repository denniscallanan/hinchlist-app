import { BASE_URL } from "./constants";
import { AccessToken } from "react-native-fbsdk";

export const apiRequest = (url, data) => {
  return AccessToken.getCurrentAccessToken().then(tokenData => {
    const accessToken = tokenData.accessToken.toString();
    const requestData = {
      ...data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": accessToken
      }
    };
    return fetch(BASE_URL + url, requestData).then(response => {
      return response.json();
    });
  });
};
