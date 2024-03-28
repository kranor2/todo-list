import { createTask } from "../backend/task";
import { getProgressPercentage } from "../backend/project";

import { createTaskItem, createTaskCard } from "./task-dom";

async function openProjectPage(project) {
    const projectPage = document.querySelector(".project");
    projectPage.style.transform = "translateX(-100vw)";

    const homePage = document.querySelector(".home");
    homePage.style.transform = "translateX(-100vw)";

    const goBackBtn = document.querySelector(".go-back-btn");
    goBackBtn.removeEventListener("click", closeProjectPage);
    goBackBtn.addEventListener("click", closeProjectPage);

    const projectName = document.querySelector(".project-name");
    projectName.textContent = project.name;

    const newTaskBtn = document.querySelector(".new-task-btn");

    const newTaskBtnClone = newTaskBtn.cloneNode(true);
    newTaskBtn.parentNode.replaceChild(
        newTaskBtnClone,
        newTaskBtn
    );

    newTaskBtnClone.addEventListener("click", () => {
        createTaskCard(createTask("", "", "low", new Date()), project, 0, true);
    });

    const headerGutter = document.querySelector(".projects-header-gutter");
    headerGutter.style.backgroundColor = `${project.color}80`;

    const progressMeter = document.querySelector(".progress-meter");
    progressMeter.style.backgroundColor = project.color;
    progressMeter.style.width = `${getProgressPercentage(project)}%`;

    const taskList = document.querySelector(".task-list");
    project.tasks.forEach((task, index) => {
        taskList.appendChild(createTaskItem(task, project, index))
    });
}

async function closeProjectPage() {
    const projectPage = document.querySelector(".project");
    projectPage.style.transform = "";

    const homePage = document.querySelector(".home");
    homePage.style.transform = "";
    await new Promise((r) => setTimeout(r, 250));

    const taskList = document.querySelector(".task-list");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }
}

export { openProjectPage, closeProjectPage };