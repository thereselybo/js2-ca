import displayMessage from "./displayMessage.js";
import { baseUrl } from "../../settings/constants.js";
import { saveToStorage, tokenKey, userKey } from "../../utils/storage.js";

export async function login(username, password) {
  const url = `${baseUrl}auth/local`;
  const data = JSON.stringify({ identifier: username, password: password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.user) {
      saveToStorage(tokenKey, json.jwt);
      saveToStorage(userKey, json.user);
      displayMessage("is-success", "Successfully logged in");
      setTimeout(() => {
        location.href = "./";
      }, 2000);
    }
    if (json.error) {
      displayMessage("is-warning", "You don't have access to log in");
    }
  } catch (error) {
    displayMessage("is-warning", error);
  }
}
