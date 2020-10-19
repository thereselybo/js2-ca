import createMenu from "./components/common/createMenu.js";
import validation from "./utils/validation.js";
import login from "./components/common/login.js";

createMenu();

const form = document.querySelector("#login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.onsubmit = (e) => {
  e.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  if (validation(username, 4) && validation(password, 8)) {
    login(usernameValue, passwordValue);
  }
};
