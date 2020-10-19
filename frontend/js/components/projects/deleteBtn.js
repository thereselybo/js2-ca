import displayMessage from "../common/displayMessage.js";
import { baseUrl } from "../../settings/constants.js";
import { getFromStorage, tokenKey } from "../../utils/storage.js";

export default function deleteBtn(id) {
  const button = document.querySelector("#delete");

  button.onclick = () => {
    const confirmDeletion = document.querySelector("#confirmDeletion");
    const confirmBtn = document.querySelector("#confirmBtn");
    const cancelBtn = document.querySelector("#cancelBtn");
    const closeBtn = document.querySelector("#closeBtn");

    confirmDeletion.classList.toggle("is-active");

    confirmBtn.onclick = async function () {
      confirmDeletion.classList.toggle("is-active");
      const url = `${baseUrl}projects/${id}`;
      const token = getFromStorage(tokenKey);
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, options);
        const json = response.json();

        displayMessage("is-success", "Project was successfully deleted");
        setTimeout(() => {
          location.href = "./";
        }, 2000);
      } catch (error) {
        displayMessage("is-warning", error);
      }
    };

    cancelBtn.onclick = () => {
      confirmDeletion.classList.toggle("is-active");
    };

    closeBtn.onclick = () => {
      confirmDeletion.classList.toggle("is-active");
    };
  };
}
