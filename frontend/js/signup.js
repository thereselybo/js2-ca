import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";
import validation from "./utils/validation.js";
import { validateEmail } from "./utils/validation.js";
import { baseUrl } from "./settings/constants.js";
import { saveToStorage, tokenKey, userKey } from "./utils/storage.js";
import { login } from "./components/common/login.js";

createMenu();

const form = document.querySelector("#signup-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.onsubmit = (e) => {
  e.preventDefault();

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (
    validation(username, 4) &&
    validateEmail(email) &&
    validation(password, 8)
  ) {
    signup(usernameValue, emailValue, passwordValue);
  }
};

async function signup(username, email, password) {
  const url = `${baseUrl}auth/local/register`;
  const data = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });
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
      displayMessage("is-success", "Successfully created user");
      login(username, password);

      setTimeout(() => {
        location.href = "./";
      }, 2000);
    }
  } catch (error) {
    displayMessage("is-warning", error);
  }
}
