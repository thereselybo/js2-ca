import createMenu from "../common/createMenu.js";
import displayMessage from "../common/displayMessage.js";
import { baseUrl } from "../../settings/constants.js";
import { getFromStorage, tokenKey, userKey } from "../../utils/storage.js";
import validateElement from "../../utils/validation.js";
import { validateLink, checkUrlProtocol } from "../../utils/validation.js";

if (!getFromStorage(userKey).id) {
  location.href = "./";
}

createMenu();

const form = document.querySelector("#addProjectForm");
const projectName = document.querySelector("#projectName");
const techs = document.querySelector("#techs");
const description = document.querySelector("#description");
const imgLink = document.querySelector("#imgLink");
const projectLink = document.querySelector("#projectLink");

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
    addProject(projNameValue, techsValue, descValue, imgValue, projLinkValue);
  }
};

async function addProject(name, techs, description, image, live_link) {
  image = checkUrlProtocol(image);
  live_link = checkUrlProtocol(live_link);

  const url = `${baseUrl}projects`;
  const data = JSON.stringify({
    name: name,
    techs: techs,
    description: description,
    image: image,
    live_link: live_link,
  });
  const token = getFromStorage(tokenKey);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("is-success", "Successfully added project");
    }
    if (json.error) {
      displayMessage("is-warning", json.error);
    }
  } catch (error) {
    displayMessage("is-warning", error);
  }
}
