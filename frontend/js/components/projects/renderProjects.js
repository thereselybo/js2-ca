import { search, projContainer } from "../../settings/constants.js";
import { getFromStorage, likesKey, userKey } from "../../utils/storage.js";

export default function renderProjects(projects) {
    projContainer.innerHTML = "";
    search.style.display = "flex";

    const likes = getFromStorage(likesKey);

    projects.forEach((project) => {
      const techs = project.techs.replace(/, /g, " | ");

      let likeClass = "";
      const isProjectLiked = likes.find(like => parseInt(like.id) === project.id);
      if(isProjectLiked) {
        likeClass = "has-text-danger";
      }

      let projImg = "https://via.placeholder.com/728x540?text=No+image+available";
      let projImgAlt = "";
      if(project.image) {
          projImg = project.image;
          projImgAlt = `alt="Screenshot of ${project.name} project"`
      }

      let projLinkBtn = "";
      if(project.live_link) {
          projLinkBtn = `
          <p class="control">
            <a href="${project.live_link}">
                <button class="button is-fullwidth is-primary">Link to live site</button>
            </a>
          </p>`
      }

      let editSection = "";
      if(getFromStorage(userKey)) {
        editSection = `
        <p class="control">
            <a href="./edit.html?id=${project.id}">
            <button class="button is-fullwidth is-info">Edit project</button>
            </a>
        </p>`
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
                          <span class="like-btn icon is-pulled-right ${likeClass}" data-id="${project.id}" data-name="${project.name}" data-img="${project.image}">
                              <i class="fa fa-heart"></i>
                          </span>
                      </p>
                      <p class="subtitle is-5 is-uppercase has-text-primary has-text-weight-medium">${techs}</p>
                      <div class="content">
                        <p>${project.description}</p>
                        <div class="field is-grouped>
                            ${projLinkBtn}
                            ${editSection}
                        </div>
                      </div>
                  </div>
              </div>
          </div>`;
    });
  }
  