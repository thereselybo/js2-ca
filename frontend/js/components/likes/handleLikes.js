import {
  getFromStorage,
  saveToStorage,
  likesKey,
} from "../../utils/storage.js";

export default function handleLikes() {
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((button) => {
    button.onclick = (e) => {
      e.target.parentNode.classList.toggle("has-text-danger");

      const currentButton = e.target.parentNode.parentNode;
      const id = currentButton.dataset.id;
      const name = currentButton.dataset.name;
      const image = currentButton.dataset.img;

      const currentLikes = getFromStorage(likesKey);

      const alreadyLiked = currentLikes.find((like) => like.id === id);

      if (!alreadyLiked) {
        const project = { id, name, image };
        currentLikes.push(project);
        saveToStorage(likesKey, currentLikes);
      } else {
        const newLikes = currentLikes.filter((like) => like.id !== id);
        saveToStorage(likesKey, newLikes);
      }
    };
  });
}
