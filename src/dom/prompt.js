import { projectlist, saveProjectlist } from "../backend/projectlist";
import { createProject } from "../backend/project";

import { createProjectListItem } from "./centre";

import xIcon from "../assets/close-icon.svg";

function newProjectPrompt() {
    const promptContainer = document.createElement("div");
    promptContainer.classList.add("prompt-container");
    document.body,appendChild(promptContainer);

    const prompt = document.createElement("form");
    prompt.classList.add("prompt");
    promptContainer.appendChild(prompt);

    prompt.addEventListener("keydown", (event) => {
        if (event.key == "Enter") event.preventDefault();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape" && document.querySelector(".prompt") != undefined) {
            closePopup();
        }
    });

    const promptHeader = document.createElement("div");
    promptHeader.classList.add("prompt-header");

    const promptTitle = document.createElement("p");
    promptTitle.classList.add("prompt-title");
    promptTitle.textContent = "New Project";
    promptHeader.appendChild(promptTitle);

    const closePromptBtn = document.createElement("button");
    closePromptBtn.type = "button";
    closePromptBtn.classList.add("close-prompt");
    closePromptBtn.addEventListener("click", closePrompt);
    closePromptBtn.appendChild(closePromptBtn);

    const closePromptIcon = document.createElement("img");
    closePromptIcon = xIcon;
    closePromptIcon.alt = "Close Prompt";
    closePromptBtn.appendChild(closePromptIcon);

    prompt.appendChild(promptHeader);

    const promptFields = document.createElement("div");
    promptFields.classList.add("prompt-fields");
    prompt.appendChild(promptFields);

    const nameField = document.createElement("div");
    nameField.classList.add("field", "name-field");
    promptFields.appendChild(nameField);

    const nameLabel = document.createElement("label");
    nameLabel.for = "name";
    nameLabel.textContent = "Name";
    nameField.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.classList.add("name-input");
    nameInput.name = "name";
    nameField.appendChild(nameInput);

    const colorField = document.createElement("div");
    colorField.classList.add("field", "color-field");
    promptFields.appendChild(colorField);

    const colorLabel = document.createElement("label");
    colorLabel.for = "color";
    colorLabel.textContent = "Color";
    colorField.appendChild(colorLabel);

    const colorInput = document.createElement("input");
    colorInput.classList.add("color-input");
    colorInput.type = "color";
    colorInput.name = "color";
    colorField.appendChild(colorInput);

    const createBtn = document.createElement("button");
    createBtn.classList.add("prompt-submit");
    createBtn.type = "button";
    createBtn.textContent = "Create";
    prompt.appendChild(createBtn);

    createBtn.addEventListener("click", () => {
        const projectList = document.querySelector(".project-list");
        const newProject = createProject(nameInput.value, colorInput.value);
        projectlist.push(newProject);
        saveProjectlist();
        projectList.appendChild(createProjectListItem(newProject));
        closePrompt();
    });

}

function editProjectPrompt(index) {
    const promptContainer = document.createElement("div");
    promptContainer.classList.add("prompt-container");
    document.body,appendChild(promptContainer);

    const prompt = document.createElement("form");
    prompt.classList.add("prompt");
    promptContainer.appendChild(prompt);

    prompt.addEventListener("keydown", (event) => {
        if (event.key == "Enter") event.preventDefault();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key == "Escape" && document.querySelector(".prompt") != undefined) {
            closePopup();
        }
    });

    const promptHeader = document.createElement("div");
    promptHeader.classList.add("prompt-header");

    const promptTitle = document.createElement("p");
    promptTitle.classList.add("prompt-title");
    promptTitle.textContent = "New Project";
    promptHeader.appendChild(promptTitle);

    const closePromptBtn = document.createElement("button");
    closePromptBtn.type = "button";
    closePromptBtn.classList.add("close-prompt");
    closePromptBtn.addEventListener("click", closePrompt);
    closePromptBtn.appendChild(closePromptBtn);

    const closePromptIcon = document.createElement("img");
    closePromptIcon = xIcon;
    closePromptIcon.alt = "Close Prompt";
    closePromptBtn.appendChild(closePromptIcon);

    prompt.appendChild(promptHeader);

    const promptFields = document.createElement("div");
    promptFields.classList.add("prompt-fields");
    prompt.appendChild(promptFields);

    const nameField = document.createElement("div");
    nameField.classList.add("field", "name-field");
    promptFields.appendChild(nameField);

    const nameLabel = document.createElement("label");
    nameLabel.for = "name";
    nameLabel.textContent = "Name";
    nameField.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.classList.add("name-input");
    nameInput.name = "name";
    nameField.appendChild(nameInput);

    const colorField = document.createElement("div");
    colorField.classList.add("field", "color-field");
    promptFields.appendChild(colorField);

    const colorLabel = document.createElement("label");
    colorLabel.for = "color";
    colorLabel.textContent = "Color";
    colorField.appendChild(colorLabel);

    const colorInput = document.createElement("input");
    colorInput.classList.add("color-input");
    colorInput.type = "color";
    colorInput.name = "color";
    colorField.appendChild(colorInput);

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("prompt-submit");
    saveBtn.type = "button";
    saveBtn.textContent = "Save Changes";
    prompt.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
        const projectList = document.querySelector(".project-list");
        projectlist[index].name = nameInput.value;
        projectlist[index].color = colorInput.value;
        projectList.replaceChild(
            createProjectListItem(projectlist[index]),
            projectList.childNodes[index]
        );

        saveProjectlist();
        closePrompt();
    });

}

function closePrompt() {
    const promptContainer = document.querySelector(".prompt-container");
    document.body.removeChild(promptContainer);
}

export { newProjectPrompt, editProjectPrompt };