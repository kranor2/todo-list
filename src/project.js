import { createAction } from "./task"

function createProject(name, color) {
    let tasks = [];

    return {
        name,
        color,
        tasks,
    };
}

function addTask(title, description, priority, dueDate, project) {
    const task = createAction(title, description, priority, dueDate);
    prependTask(task, project);
    return task;
}

function prependTask(task, project) {
    project.tasks.unshift(task);
}

function removeTask(index, project) {
    project.tasks.splice(index, 1);
}

function getProgressPercentage(project) {
    let complete = 0
    let taskCount = project.tasks.length;
    project.actions.forEach((task) => {
        if (task.completed) complete++;
    });
    return (complete / taskCount) * 100;
}

export {
    createProject,
    addTask,
    prependTask,
    removeTask,
    getProgressPercentage,
};