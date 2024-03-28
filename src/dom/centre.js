import { projectlist, saveProjectlist } from "../backend/projectlist";

import { openProjectPage } from "./project-dom";
import { editProjectPrompt, newProjectPrompt } from "./prompt";

import optsIcon from "../assets/opts-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import trashIcon from "../assets/trash-icon.svg";

function createProjectListItem(project) {
    const listItem = document.createElement("li");
    listItem.classList.add("project-list-item");

    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.backgroundColor = project.color;
    listItem.appendChild(circle);

    const projectName = document.createElement("p");
    projectName.classList.add("project-list-item-name");
    projectName.textContent = project.name;
    listItem.appendChild(projectName);

    const projectOptsBtn = document.createElement("button");
    projectOptsBtn.classList.add("project-options-btn");
    const projectOptsIcon = document.createElement("img");
    projectOptsIcon.src = optsIcon;
    projectOptsBtn.appendChild(projectOptsIcon);
    listItem.appendChild(projectOptsBtn);

    projectOptsBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const existingPrompt = document.querySelector(".project-opts-list");
        if (existingPrompt) {
            const parent = existingPrompt.parentNode;
            parent.removeChild(existingPrompt);

            if (parent === listItem) return;
        }

        const optsList = document.createElement("div");
        optsList.classList.add("project-opts-list");

        const editOpt = document.createElement("button");
        editOpt.classList.add("project-opt");
        editOpt.classList.add("project-edit-opt-btn");

        const editOptIcon = document.createElement("img");
        editOptIcon.src = editIcon;
        editOpt.appendChild(editOptIcon);

        const editOptText = document.createElement("p");
        editOptText.classList.add("project-edit-opt-txt");
        editOptText.textContent = "Edit";
        editOpt.appendChild(editOptText);

        editOpt.addEventListener("click", (event) => {
            event.stopPropagation();
            editProjectPrompt(
                Array.prototype.indexOf.call(listItem.parentNode.childNodes, listItem)
            );
        });

        optsList.appendChild(editOpt);

        const deleteOpt = document.createElement("button");
        deleteOpt.classList.add("project-opt");
        deleteOpt.classList.add("project-edit-opt-btn");

        const deleteIcon = document.createElement("img");
        deleteIcon.src = trashIcon;
        deleteOpt.appendChild(deleteIcon);

        const deleteOptText = document.createElement("p");
        deleteOptText.classList.add("project-edit-opt-text");
        deleteOptText.textContent = "Delete";
        deleteOpt.appendChild(deleteOptText);

        deleteOpt.addEventListener("click", (event) => {
            const projectList = document.querySelector(".project-list");
            const index = Array.prototype.indexOf.call(projectList.childNodes, listItem);
            projectList.removeChild(projectList.childNodes[index]);
            projectlist.splice(index, 1);
            saveProjectlist();
            event.stopPropagation();
        });

        optsList.appendChild(deleteOpt);
        listItem.appendChild(optsList);

    });

    window.addEventListener("click", () => {
        const existingPrompt = document.querySelector(".prompt-opts-list");
        if (existingPrompt) existingPrompt.parentNode.removeChild(existingPrompt);
    });

    listItem.addEventListener("click", () => {
        openProjectPage(project);
    });
    
    return listItem;
}

function displayProjectList() {
    const projectList = document.querySelector(".project-list");
    projectlist.forEach((project) => {
        projectList.appendChild(createProjectListItem(project));
    });

    const projectPlusBtn = document.querySelector(".add-project");
    projectPlusBtn.addEventListener("click", () => {
        newProjectPrompt();
    });
}

export { displayProjectList, createProjectListItem };