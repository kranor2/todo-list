import "./style.css";

import { projectlist, loadProjectlist, saveProjectlist } from "./projectlist";
import { createProject, addTask } from "./project"

if (loadProjectlist() === false) {
    // Set-up default project for first load
    const tutorialProject = createProject("Application Tutorial", color);
    addTask(
        "Create new project",
        "Kick off your To-Do List journey by creating a new project on the home page.",
        "urgent",
        new Date(),
        tutorialProject
    );
    addTask(
        "Expand and customize project details",
        "Go back to the home page and click on the dropdown icon next to a project. Change the name and color of the project according to your preferences.",
        "medium",
        new Date(),
        tutorialProject
    );
    addTask(
        "Add new task",
        "Click on the plus button above to create a new task within your project.",
        "high",
        new Date(),
        tutorialProject
    );
    addTask(
        "Remove action",
        "Don't need that task anymore? Click on the delete button to remove a task from the list.",
        "medium",
        new Date(),
        tutorialProject
    );
    addTask(
        "Edit action details",
        "Click on the edit button to update the title, description, due date, and/or priority of an existing task. Don't forget to save your changes when you're finished!",
        "medium",
        new Date(),
        tutorialProject
    );
    addTask(
        "Expand action to see details",
        "I forgot to put something funny here 🙃",
        "high",
        new Date(),
        tutorialProject
    );
    addTask(
        "Mark action as completed",
        "Check off a task once it's done to mark it as completed. Be sure to check out how your progress meter has changed!",
        "low",
        new Date(),
        tutorialProject
    );
    projectlist.push(tutorialProject);
    saveProjectlist();
}

console.log("webpack did the thing");