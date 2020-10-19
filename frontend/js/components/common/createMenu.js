import { getFromStorage, userKey } from "../../utils/storage.js";
import logout from "./logout.js";

export default function createMenu() {
  const container = document.querySelector(".nav-container");
  const user = getFromStorage(userKey);

  const pathname = location.pathname;

  let loggedInItems = `
    <div class="buttons navbar-item">
      <a href="login.html" class="button is-primary"> Log in </a>
      <a href="signup.html" class="button is-white"> Sign up </a>
    </div>`;

  if (user.id) {
    const greeting = `Hello, ${user.username}`;
    loggedInItems = `
        <a href="./add.html" class="navbar-item ${
          pathname === "/frontend/add.html" ? "is-active" : ""
        }">Add project</a>
      <div class="navbar-item">
        ${greeting}
      </div>
        <div class="buttons navbar-item">
          <a class="button is-primary" id="logout"> Log out </a>
        </div>
    `;
  }

  container.innerHTML = `
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item is-size-4" href="./index.html"> JS2 - CA </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="nav" class="navbar-menu">
            <div class="navbar-end">
                <a class="navbar-item ${
                  pathname === "/frontend/index.html" ||
                  pathname === "/frontend/" ||
                  pathname === "/frontend"
                    ? "is-active"
                    : ""
                }" href="./index.html">Home</a>
                <a class="navbar-item ${
                  pathname === "/frontend/likes.html" ? "is-active" : ""
                }" href="./likes.html">Likes</a>
              ${loggedInItems}
            </div>
          </div>
        </div>
      </nav>`;

  toggleNav();
  if (user.id) {
    logout();
  }
}

function toggleNav() {
  const navBurger = document.querySelector(".navbar-burger");
  const navbarMenu = document.querySelector(".navbar-menu");

  if (navBurger) {
    navBurger.onclick = () => {
      navBurger.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
    };
  }
}
