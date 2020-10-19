import createMenu from "../common/createMenu.js";
import { getFromStorage, userKey, tokenKey } from "../../utils/storage.js";
import { baseUrl } from "../../settings/constants.js";
import validateElement from "../../utils/validation.js";
import { validateLink, checkUrlProtocol } from "../../utils/validation.js";
import displayMessage from "../common/displayMessage.js";
import deleteBtn from "./deleteBtn.js";

if (!getFromStorage(userKey).id) {
  location.href = "./";
}

createMenu();

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  location.href = "./";
}

const form = document.querySelector("#editProjectForm");
const loader = document.querySelector(".progress");
const projectName = document.querySelector("#projectName");
const techs = document.querySelector("#techs");
const description = document.querySelector("#description");
const imgLink = document.querySelector("#imgLink");
const projectLink = document.querySelector("#projectLink");
const projectId = document.querySelector("#projectId");

(async function () {
  const url = `${baseUrl}projects`;

  try {
    const response = await fetch(url);
    const projects = await response.json();

    const projectExists = projects.filter(
      (project) => project.id === parseInt(id)
    );

    if (projectExists.length) {
      const project = projectExists[0];
      projectName.value = project.name;
      techs.value = project.techs;
      description.value = project.description;
      imgLink.value = project.image;
      projectLink.value = project.live_link;
      projectId.value = project.id;

      deleteBtn(id)
    } else {
      location.href = "./";
    }
  } catch (error) {
    displayMessage("is-warning", error);
  } finally {
    loader.style.display = "none";
    form.style.display = "block";
  }
})();

form.onsubmit = (e) => {
  e.preventDefault();

  const projNameValue = projectName.value.trim();
  const techsValue = techs.value.trim();
  const descValue = description.value.trim();
  const imgValue = imgLink.value.trim();
  const projLinkValue = projectLink.value.trim();

  if (
    validateElement(projectName, 3) &&
    validateElement(techs, 3) &&
    validateElement(description, 3) &&
    validateLink(imgLink) &&
    validateLink(projectLink)
  ) {
    updateProject(
      projNameValue,
      techsValue,
      descValue,
      imgValue,
      projLinkValue
    );
  }
};

async function updateProject(name, techs, description, image, live_link) {
  image = checkUrlProtocol(image);
  live_link = checkUrlProtocol(live_link);

  const url = `${baseUrl}projects/${id}`;
  const token = getFromStorage(tokenKey);
  const data = JSON.stringify({
    name: name,
    techs: techs,
    description: description,
    image: image,
    live_link: live_link,
  });
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("is-success", "Successfully updated project");
    }
    if (json.error) {
      displayMessage("is-warning", json.error);
    }
  } catch (error) {
    displayMessage("is-warning", error);
  }
}
