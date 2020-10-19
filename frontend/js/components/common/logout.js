import { removeFromStorage, userKey, tokenKey } from "../../utils/storage.js";

export default function logout() {
  const container = document.querySelector(".nav-container");
  const logoutBtn = document.querySelector("#logout");

  logoutBtn.onclick = () => {
    container.innerHTML += `
        <div class="modal is-active" id="logoutModal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Logout</p>
                <button class="delete" aria-label="close" id="closeBtn" type="button"></button>
                </header>
                <section class="modal-card-body">
                Are you sure you want to logout?
                </section>
                <footer class="modal-card-foot">
                <button class="button is-danger" id="confirmBtn">Yes</button>
                <button class="button" id="cancelBtn">No</button>
                </footer>
            </div>
        </div>`;

    const logoutModal = document.querySelector("#logoutModal");
    const confirmBtn = document.querySelector("#confirmBtn");
    const cancelBtn = document.querySelector("#cancelBtn");
    const closeBtn = document.querySelector("#closeBtn");

    confirmBtn.onclick = () => {
      removeFromStorage(userKey);
      removeFromStorage(tokenKey);
      location.href = "./";
    };
    cancelBtn.onclick = () => {
      logoutModal.parentNode.removeChild(logoutModal);
    };
    closeBtn.onclick = () => {
      logoutModal.parentNode.removeChild(logoutModal);
    };

    logout();
  };
}
