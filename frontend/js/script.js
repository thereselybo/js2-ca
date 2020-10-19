import createMenu from "./components/common/createMenu.js";
import displayMessage from "./components/common/displayMessage.js";
import handleLikes from "./components/likes/handleLikes.js";
import renderProjects from "./components/projects/renderProjects.js";
import searchProjects from "./components/projects/searchProjects.js";
import { baseUrl } from "./settings/constants.js";

createMenu();

(async function () {
  const url = `${baseUrl}projects`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    renderProjects(json);
    searchProjects(json);
    handleLikes();
  } catch (error) {
    displayMessage("is-danger", error);
  }
})();