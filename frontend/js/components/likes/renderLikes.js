import createMenu from "../common/createMenu.js";
import dislike from "./dislike.js";
import displayMessage from "../common/displayMessage.js";
import { projContainer } from "../../settings/constants.js";
import { getFromStorage, likesKey } from "../../utils/storage.js";

createMenu();

export default function renderLikes() {
  projContainer.innerHTML = "";

  const likes = getFromStorage(likesKey);

  if (likes.length) {
    const clearBtn = document.querySelector(".clear-btn");
    clearBtn.style.display = "inline-block";

    likes.forEach((project) => {
      let projImg = "https://via.placeholder.com/728x540?text=No+image+available";
      let projImgAlt = "";
      if (project.image) {
        projImg = project.image;
        projImgAlt = `alt="Screenshot of ${project.name} project"`;
      }
      
      projContainer.innerHTML += `
        <div class="column is-4">
              <div class="card project">
                  <div class="card-image">
                      <figure class="image is-4by3">
                      <img src="${projImg}" ${projImgAlt}>
                      </figure>
                  </div>
                  <div class="card-content">
                      <p class="title is-4">${project.name}
                          <span class="like-btn icon is-pulled-right has-text-danger" data-id="${project.id}">
                              <i class="fa fa-heart"></i>
                          </span>
                      </p>
                  </div>
              </div>
          </div>`;
    });
    dislike();
  } else {
    displayMessage(
      "is-warning",
      "You have not liked any projects. Come on, they're not that bad"
    );
  }
}

renderLikes();
