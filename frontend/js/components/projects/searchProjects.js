import { search, projContainer } from "../../settings/constants.js";
import displayMessage from "../common/displayMessage.js";
import renderProjects from "./renderProjects.js";

export default function searchProjects(projects) {
  search.onkeyup = function (e) {
    const searchValue = e.target.value.trim().toLowerCase();
    const messageContainer = document.querySelector(".message-container");

    const filteredProjects = projects.filter((project) => {
      const name = project.name.toLowerCase();
      const techs = project.techs.toLowerCase();
      return name.includes(searchValue) || techs.includes(searchValue);
    });

    messageContainer.innerHTML = "";

    if (filteredProjects.length) {
      renderProjects(filteredProjects);
    } else {
      projContainer.innerHTML = "";
      displayMessage("is-warning", "No project names or project technologies match your search");
    }
  };
}
