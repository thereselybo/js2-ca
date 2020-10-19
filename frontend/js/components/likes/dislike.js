import {
  saveToStorage,
  getFromStorage,
  removeFromStorage,
  likesKey,
} from "../../utils/storage.js";
import renderLikes from "./renderLikes.js";

export default function dislike() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.onclick = (e) => {
      const currentButton = e.target.parentNode.parentNode;
      const id = currentButton.dataset.id;

      const currentLikes = getFromStorage(likesKey);

      const newLikes = currentLikes.filter((like) => like.id !== id);
      saveToStorage(likesKey, newLikes);
      renderLikes();
    };
  });
}

(function clearAllLikes() {
  const clearButton = document.querySelector(".clear-btn");

  clearButton.onclick = () => {
    removeFromStorage(likesKey);
    renderLikes();
  };
})();
